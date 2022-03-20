import { useState, VFC } from 'react';
import { Button, Input, AutoComplete } from 'antd';
import { Term } from 'types/Term';
import { useRequest } from 'ahooks';
import { DefinitionsList } from './DefinitionsList';
import { getUniquePartOfSpeechOptions } from '../api/getUniquePartsOfSpeech';
import { getTermWordsOptions } from '../api/getTermWords';

export interface FormProps {
  term?: Term;
  onSubmit: (values: Term) => void;
  onCancel: () => void;
}

export const Form: VFC<FormProps> = ({ term, onCancel, onSubmit }) => {
  const [entry, setEntry] = useState<Term>({
    word: '',
    partOfSpeech: '',
    translation: '',
    definition: '',
    answersCount: 0,
    correctAnswersCount: 0,
    ...(term ?? {}),
  });

  const { data: partOfSpeechOptions } = useRequest(getUniquePartOfSpeechOptions);
  const { data: wordsOptions } = useRequest(getTermWordsOptions, {
    defaultParams: [entry.word],
  });

  const handleChange = (values: Partial<Term>) => setEntry(prevEntry => ({ ...prevEntry, ...values }));

  const handleConfirm = () => onSubmit(entry);

  return (
    <>
      <AutoComplete
        allowClear
        options={wordsOptions}
        placeholder="Word"
        style={{ width: '100%' }}
        value={entry.word}
        onChange={value => handleChange({ word: value ?? '' })}
        onSelect={(value: string) => handleChange({ word: value })}
      />
      <AutoComplete
        allowClear
        options={partOfSpeechOptions}
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
      <Button danger type="primary" onClick={onCancel}>
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
