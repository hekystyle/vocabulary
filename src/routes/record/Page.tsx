import { Button, Input, AutoComplete } from 'antd';
import { useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from 'reducer';
import { Term } from 'types/Term';
import { dictionarySlice } from 'routes/list/reducer';
import { selectById } from 'routes/list/adapters';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { DefinitionsList } from './DefinitionsList';
import { selectTermOptions, selectUniqPartOfSpeechOptions } from './selectors';

export const RecordPage: VFC = () => {
  const { id } = useParams<{ id?: string }>();

  const editedEntry = useSelector<AppState, Term | undefined>(s => (id ? selectById(s, parseInt(id)) : undefined));

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

  const navigate = useNavigate();

  const navigateRoot = () => navigate('/');

  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(
      id ? dictionarySlice.actions.updateOne({ id: entry.id, changes: entry }) : dictionarySlice.actions.addOne(entry),
    );
    navigateRoot();
  };

  const handleCancel = () => navigateRoot();

  const handleChange = (values: Partial<Term>) => setEntry(prevEntry => ({ ...prevEntry, ...values }));

  const termOptions = useTypedSelector(selectTermOptions);
  const uniqPartOfSpeechOptions = useTypedSelector(selectUniqPartOfSpeechOptions);
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
