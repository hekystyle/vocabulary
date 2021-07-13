import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Record } from "../RecordPage";
import {
  Answer,
  answersComparer,
  hasDefinition,
  prepareAnswersSet,
  sortImmutable,
} from "../utils";

export interface PracticePageProps {
  records: Record[];
  onAnswer?: (a: Answer<Record>) => void;
}

export function PracticePage({ records, onAnswer }: PracticePageProps) {
  const [state, setState] = useState(() => {
    const stack = sortImmutable(records.filter(hasDefinition), answersComparer);

    const actualRecord = stack.pop();

    const actualAnswersSet = actualRecord
      ? prepareAnswersSet(actualRecord, records)
      : [];

    return { stack, actualRecord, actualAnswersSet };
  });
  const [actualAnswer, setAnswer] = useState<Answer<Record>>();

  const handleAnswerClick = (answer: Answer<Record>) => {
    if (actualAnswer) return;
    setAnswer(answer);
    if (onAnswer && state.actualRecord)
      onAnswer({ isCorrect: answer.isCorrect, entity: state.actualRecord });
  };

  const handleNextClick = () => {
    setState((state) => {
      const stack = [...state.stack];

      const actualRecord = stack.pop();

      const actualAnswersSet = actualRecord
        ? prepareAnswersSet(actualRecord, records)
        : [];

      return { stack, actualRecord, actualAnswersSet };
    });
    setAnswer(undefined);
  };

  const history = useHistory();
  return (
    <>
      {state.actualRecord && (
        <div style={{ textAlign: "center" }}>
          {state.actualRecord.word} (<i>{state.actualRecord.partOfSpeech}</i>)
        </div>
      )}
      {state.actualAnswersSet.map((answer) => (
        <Button
          key={answer.entity.id}
          disabled={Boolean(actualAnswer)}
          onClick={() => handleAnswerClick(answer)}
          theme={
            answer.isCorrect && actualAnswer
              ? "success"
              : !answer.isCorrect && answer === actualAnswer
              ? "danger"
              : "secondary"
          }
        >
          {answer.entity?.definition}
        </Button>
      ))}

      {actualAnswer && (
        <>
          <div>
            <hr />
          </div>
          <Button onClick={handleNextClick}>Next word</Button>
        </>
      )}
      <div>
        <hr />
      </div>
      <Button onClick={() => history.push("/")}>End practice</Button>
    </>
  );
}
