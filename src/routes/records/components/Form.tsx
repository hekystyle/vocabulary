import { Button, Input /* AutoComplete */ } from 'antd';
import { useState, FC /* useMemo */ } from 'react';
import { Tags } from 'components/Tags';
import { Term } from 'types/Term';
// import { useServices } from 'services';
// import { useQuery } from '@tanstack/react-query';
// import { QUERY_KEYS } from 'utils/queryKeys';
import { DefinitionsList } from './DefinitionsList';
// import { options } from '../utils/options';

export interface FormProps {
  defaultValue?: Term;
  onSubmit: (values: Term) => void;
  onCancel: () => void;
}

export const Form: FC<FormProps> = ({ defaultValue: term, onCancel, onSubmit }) => {
  // const { termsRepository } = useServices();

  const [entry, setEntry] = useState<Term>({
    word: '',
    partOfSpeech: '',
    translation: '',
    definition: '',
    answersCount: 0,
    correctAnswersCount: 0,
    tags: [],
    ...(term ?? {}),
  });

  // const { data: partsOfSpeech } = useQuery(QUERY_KEYS.terms.all(), () => termsRepository.getUniquePartsOfSpeech(), {
  //   onError: e => console.error(e),
  // });
  // const partOfSpeechOptions = useMemo(() => options(partsOfSpeech ?? []), [partsOfSpeech]);

  // const { data: words } = useQuery(
  //   QUERY_KEYS.terms.filter({ word: entry.word }),
  //   () => termsRepository.getWords(entry.word),
  //   {
  //     onError: e => console.error(e),
  //   },
  // );
  // const wordsOptions = useMemo(() => options(words ?? []), [words]);

  const handleChange = (values: Partial<Term>) => setEntry(prevEntry => ({ ...prevEntry, ...values }));

  const handleConfirm = () => onSubmit(entry);

  return (
    <>
      <Input
        allowClear
        aria-label="Word"
        // options={wordsOptions}
        placeholder="Word"
        style={{ width: '100%' }}
        value={entry.word}
        onChange={e => handleChange({ word: e.target.value })}
        // onSelect={(value: string) => handleChange({ word: value })}
      />
      <Input
        allowClear
        aria-label="Part of speech"
        // options={partOfSpeechOptions}
        placeholder="Part ot speech"
        style={{ width: '100%' }}
        value={entry.partOfSpeech}
        onChange={e => handleChange({ partOfSpeech: e.target.value })}
        // onSelect={(value: string) => handleChange({ partOfSpeech: value })}
      />
      <Input
        aria-label="Translation"
        placeholder="Translation"
        value={entry.translation}
        onChange={e => handleChange({ translation: e.target.value })}
      />
      <Input.TextArea
        aria-label="Definition"
        placeholder="Definition"
        value={entry.definition}
        onChange={e => handleChange({ definition: e.target.value })}
      />
      <Tags style={{ width: '100%' }} value={entry.tags} onChange={tags => handleChange({ tags })} />
      <Button.Group style={{ display: 'flex' }}>
        <Button block type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button block danger type="primary" onClick={onCancel}>
          Cancel
        </Button>
      </Button.Group>
      <DefinitionsList
        word={entry.word}
        onDefinitionClick={values => handleChange(values)}
        onPartOfSpeechClick={partOfSpeech => handleChange({ partOfSpeech })}
      />
    </>
  );
};
