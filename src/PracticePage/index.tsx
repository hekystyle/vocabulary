import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Record } from "../RecordPage";
import { Answer, prepareAnswersSet } from "../utils";

export interface PracticePageProps {
  records: Record[];
  onAnswer?: (a: Answer<Record>) => void;
}

export function PracticePage({ records, onAnswer }: PracticePageProps) {
  const [state, setState] = useState(() => {
    const stack = [...records];

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
        <button
          key={answer.entity.id}
          disabled={Boolean(actualAnswer)}
          onClick={() => handleAnswerClick(answer)}
          style={{
            backgroundColor:
              answer.isCorrect && actualAnswer
                ? "green"
                : !answer.isCorrect && answer === actualAnswer
                ? "red"
                : undefined,
          }}
        >
          {answer.entity?.definition}
        </button>
      ))}

      {actualAnswer && (
        <>
          <div>
            <hr />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </>
      )}
      <div>
        <hr />
      </div>
      <button onClick={() => history.push("/")}>End</button>
    </>
  );
}
