import { Button, Input } from "antd";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DefinitionsList } from "../DefinitionsList";
import { AnswersCountable } from "../utils";

export interface Record extends AnswersCountable {
  id?: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
}

export interface RecordPageProps {
  records: Record[];
  onConfirm?: (r: Record) => void;
}

export function RecordPage({ records, onConfirm }: RecordPageProps) {
  const { id } = useParams<{ id?: string }>();

  const [entry, setEntry] = useState<Record>({
    word: "",
    partOfSpeech: "",
    translation: "",
    definition: "",
    answersCount: 0,
    correctAnswersCount: 0,
    ...(id ? records.find((p) => p.id === parseInt(id)) ?? {} : {}),
  });

  const history = useHistory();

  const navigateRoot = () => history.push("/");

  const handleConfirm = () => {
    onConfirm && onConfirm(entry);
    navigateRoot();
  };

  const handleCancel = () => navigateRoot();

  return (
    <>
      <Button type="primary" danger onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
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
      <DefinitionsList
        word={entry.word}
        onDefinitionClick={(value) => setEntry({ ...entry, ...value })}
      />
    </>
  );
}
