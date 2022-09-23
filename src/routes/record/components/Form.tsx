import { useState, FC, useMemo } from 'react';
import { Button, Input, AutoComplete } from 'antd';
import { Term } from 'types/Term';
import { useServices } from 'containers/Services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
import { DefinitionsList } from './DefinitionsList';
import { options } from '../utils/options';

export interface FormProps {
  term?: Term;
  onSubmit: (values: Term) => void;
  onCancel: () => void;
}

export const Form: FC<FormProps> = ({ term, onCancel, onSubmit }) => {
  const { termsRepository } = useServices();

  const [entry, setEntry] = useState<Term>({
    word: '',
    partOfSpeech: '',
    translation: '',
    definition: '',
    answersCount: 0,
    correctAnswersCount: 0,
    ...(term ?? {}),
  });

  const { data: partsOfSpeech } = useQuery(QUERY_KEYS.terms.all(), () => termsRepository.getUniquePartsOfSpeech(), {
    onError: e => console.error(e),
  });
  const partOfSpeechOptions = useMemo(() => options(partsOfSpeech ?? []), [partsOfSpeech]);

  const { data: words } = useQuery(
    QUERY_KEYS.terms.filter({ word: entry.word }),
    () => termsRepository.getWords(entry.word),
    {
      onError: e => console.error(e),
    },
  );
  const wordsOptions = useMemo(() => options(words ?? []), [words]);

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
        onChange={value => handleChange({ word: value })}
        onSelect={(value: string) => handleChange({ word: value })}
      />
      <AutoComplete
        allowClear
        options={partOfSpeechOptions}
        placeholder="Part ot speech"
        style={{ width: '100%' }}
        value={entry.partOfSpeech}
        onChange={value => handleChange({ partOfSpeech: value })}
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
