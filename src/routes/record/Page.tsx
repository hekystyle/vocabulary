import { Button, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DefinitionsList } from "./DefinitionsList";
import { AppState, dictionarySlice } from "reducer";
import { DictionaryEntry } from "types/DictionaryEntry";

export interface RecordPageProps {}

export function RecordPage(props: RecordPageProps) {
  const { id } = useParams<{ id?: string }>();

  const editedEntry = useSelector<AppState, DictionaryEntry | undefined>((s) =>
    id ? s.find((p) => p.id === parseInt(id)) : undefined
  );

  const [entry, setEntry] = useState<DictionaryEntry>({
    word: "",
    partOfSpeech: "",
    translation: "",
    definition: "",
    answersCount: 0,
    correctAnswersCount: 0,
    ...(editedEntry ?? {}),
  });

  const history = useHistory();

  const navigateRoot = () => history.push("/");

  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(
      id
        ? dictionarySlice.actions.update(entry)
        : dictionarySlice.actions.create(entry)
    );
    navigateRoot();
  };

  const handleCancel = () => navigateRoot();

  return (
    <>
      <Input
        placeholder="Word"
        value={entry.word}
        onChange={(e) => setEntry({ ...entry, word: e.target.value })}
      />
      <Input
        placeholder="Pard ot speech"
        value={entry.partOfSpeech}
        onChange={(e) => setEntry({ ...entry, partOfSpeech: e.target.value })}
      />
      <Input
        placeholder="Translation"
        value={entry.translation}
        onChange={(e) => setEntry({ ...entry, translation: e.target.value })}
      />
      <Input.TextArea
        placeholder="Definition"
        value={entry.definition}
        onChange={(e) => setEntry({ ...entry, definition: e.target.value })}
      />
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
      <Button type="primary" danger onClick={handleCancel}>
        Cancel
      </Button>
      <DefinitionsList
        word={entry.word}
        onPartOfSpeechClick={(partOfSpeech) =>
          setEntry((entry) => ({ ...entry, partOfSpeech }))
        }
        onDefinitionClick={(values) =>
          setEntry((entry) => ({ ...entry, ...values }))
        }
      />
    </>
  );
}
