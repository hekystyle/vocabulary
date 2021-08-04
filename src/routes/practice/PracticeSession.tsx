import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { CardBody } from "components/CardBody";
import { DictionaryEntry } from "types/DictionaryEntry";
import { AppState, dictionarySlice } from "reducer";
import { answersComparer, sortImmutable } from "utils";
import { FILTERS, Knowledge, SELECTORS } from "./constants";
import { PracticePageProps } from "./Page";

interface PracticeSessionProps extends PracticePageProps {
  knowledge: Knowledge;
}

interface Progress {
  stack: DictionaryEntry[];
  actualRecord?: DictionaryEntry;
}

export const PracticeSession: FC<PracticeSessionProps> = ({ knowledge }) => {
  const records = useSelector<AppState, DictionaryEntry[]>((s) => s);

  const filteredRecords = useMemo(
    () => records.filter(FILTERS[knowledge]),
    [records, knowledge]
  );

  const [progress, setProgress] = useState<Progress>(() => {
    const stack = sortImmutable(filteredRecords, answersComparer);

    const actualRecord = stack.pop();

    return { stack, actualRecord };
  });

  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleRevealAnswer = () => setIsAnswerRevealed(true);

  const dispatch = useDispatch();
  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (progress?.actualRecord)
      dispatch(
        dictionarySlice.actions.answer({
          isCorrect,
          entity: progress.actualRecord,
        })
      );
    setIsAnswerRevealed(false);
    setProgress((state) => {
      const stack = [...(state?.stack ?? [])];

      const actualRecord = stack.pop();

      return { stack, actualRecord };
    });
  };

  if (!progress.actualRecord) return null;
  return (
    <>
      <Card>
        <CardBody className="text-center">
          <div>{SELECTORS[knowledge](progress.actualRecord)}</div>
          <div>
            (<i>{progress.actualRecord.partOfSpeech}</i>)
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="text-center">
          {isAnswerRevealed ? progress.actualRecord.word : "?"}
        </CardBody>
      </Card>
      {!isAnswerRevealed ? (
        <Button onClick={handleRevealAnswer}>Reveal answer</Button>
      ) : (
        <>
          <Button theme="success" onClick={() => handleAnswerButtonClick(true)}>
            Correct
          </Button>
          <Button theme="danger" onClick={() => handleAnswerButtonClick(false)}>
            Incorrect
          </Button>
        </>
      )}
    </>
  );
};
