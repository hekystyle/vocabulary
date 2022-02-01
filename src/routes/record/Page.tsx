import { Button, Input, AutoComplete } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DefinitionsList } from "./DefinitionsList";
import { AppState } from "reducer";
import { Term } from "types/Term";
import { dictionarySlice } from "routes/list/reducer";
import { selectById } from "routes/list/adapters";
import { useTypedSelector } from "hooks/useTypedSelector";
import {
  selectTermOptions,
  selectUniqPartOfSpeechOptions,
} from "./selectors";

export interface RecordPageProps {}

export function RecordPage(props: RecordPageProps) {
  const { id } = useParams<{ id?: string }>();

  const editedEntry = useSelector<AppState, Term | undefined>((s) =>
    id ? selectById(s, parseInt(id)) : undefined
  );

  const [entry, setEntry] = useState<Term>({
    id: 0,
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
        ? dictionarySlice.actions.updateOne({ id: entry.id, changes: entry })
        : dictionarySlice.actions.addOne(entry)
    );
    navigateRoot();
  };

  const handleCancel = () => navigateRoot();

  const handleChange = (values: Partial<Term>) =>
    setEntry((entry) => ({ ...entry, ...values }));

  const termOptions = useTypedSelector(selectTermOptions);
  const uniqPartOfSpeechOptions = useTypedSelector(
    selectUniqPartOfSpeechOptions
  );
  return (
    <>
      <AutoComplete
        allowClear
        placeholder="Word"
        value={entry.word}
        options={termOptions}
        filterOption={(inputValue, option) =>
          typeof option?.value === "string" &&
          option.value.startsWith(inputValue)
        }
        onChange={(value) => handleChange({ word: value ?? "" })}
        onSelect={(value: string) => handleChange({ word: value })}
        style={{ width: "100%" }}
      />
      <AutoComplete
        allowClear
        placeholder="Part ot speech"
        value={entry.partOfSpeech}
        options={uniqPartOfSpeechOptions}
        onChange={(value) => handleChange({ partOfSpeech: value ?? "" })}
        onSelect={(value: string) => handleChange({ partOfSpeech: value })}
        style={{ width: "100%" }}
      />
      <Input
        placeholder="Translation"
        value={entry.translation}
        onChange={(e) => handleChange({ translation: e.target.value })}
      />
      <Input.TextArea
        placeholder="Definition"
        value={entry.definition}
        onChange={(e) => handleChange({ definition: e.target.value })}
      />
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
      <Button type="primary" danger onClick={handleCancel}>
        Cancel
      </Button>
      <DefinitionsList
        word={entry.word}
        onPartOfSpeechClick={(partOfSpeech) => handleChange({ partOfSpeech })}
        onDefinitionClick={(values) => handleChange(values)}
      />
    </>
  );
}
