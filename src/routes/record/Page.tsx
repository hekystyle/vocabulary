import { Button, Input, AutoComplete } from 'antd';
import { useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Term } from 'types/Term';
import { dictionarySlice } from 'routes/list/slices';
import { selectById } from 'routes/list/adapters';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { isObject } from 'utils/isObject';
import { DefinitionsList } from './components/DefinitionsList';
import { selectTermOptions, selectUniqPartOfSpeechOptions } from './selectors';
import { hasReturnUrlField } from './utils/hasReturnUrlField';

export const RecordPage: VFC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { state } = useLocation();

  const editedEntry = useTypedSelector<Term | undefined>(s => (id ? selectById(s, parseInt(id)) : undefined));
  const termOptions = useTypedSelector(selectTermOptions);
  const uniqPartOfSpeechOptions = useTypedSelector(selectUniqPartOfSpeechOptions);

  const [entry, setEntry] = useState<Term>({
    id: 0,
    word: '',
    partOfSpeech: '',
    translation: '',
    definition: '',
    answersCount: 0,
    correctAnswersCount: 0,
    ...(editedEntry ?? {}),
  });

  const navigateBack = () => {
    if (isObject(state) && hasReturnUrlField(state)) {
      navigate(state.returnUrl);
    } else {
      navigate('/');
    }
  };

  const handleConfirm = () => {
    const { updateOne, addOne } = dictionarySlice.actions;
    dispatch(id ? updateOne({ id: entry.id, changes: entry }) : addOne(entry));
    navigateBack();
  };

  const handleCancel = () => navigateBack();

  const handleChange = (values: Partial<Term>) => setEntry(prevEntry => ({ ...prevEntry, ...values }));

  return (
    <>
      <AutoComplete
        allowClear
        filterOption={(inputValue, option) => typeof option?.value === 'string' && option.value.startsWith(inputValue)}
        options={termOptions}
        placeholder="Word"
        style={{ width: '100%' }}
        value={entry.word}
        onChange={value => handleChange({ word: value ?? '' })}
        onSelect={(value: string) => handleChange({ word: value })}
      />
      <AutoComplete
        allowClear
        options={uniqPartOfSpeechOptions}
        placeholder="Part ot speech"
        style={{ width: '100%' }}
        value={entry.partOfSpeech}
        onChange={value => handleChange({ partOfSpeech: value ?? '' })}
        onSelect={(value: string) => handleChange({ partOfSpeech: value })}
      />
      <Input
        placeholder="Translation"
        value={entry.translation}
        onChange={e => handleChange({ translation: e.target.value })}
      />
      <Input.TextArea
        placeholder="Definition"
        value={entry.definition}
        onChange={e => handleChange({ definition: e.target.value })}
      />
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
      <Button danger type="primary" onClick={handleCancel}>
        Cancel
      </Button>
      <DefinitionsList
        word={entry.word}
        onDefinitionClick={values => handleChange(values)}
        onPartOfSpeechClick={partOfSpeech => handleChange({ partOfSpeech })}
      />
    </>
  );
};
