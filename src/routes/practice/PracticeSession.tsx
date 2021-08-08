import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { groupWith } from "ramda";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { CardBody } from "components/CardBody";
import { DictionaryEntry } from "types/DictionaryEntry";
import { AppState, dictionarySlice } from "reducer";
import {
  computeAnswersScore,
  hasDefinition,
  hasTranslation,
  shuffle,
} from "utils";

const OverflowableCardBody = styled(CardBody)`
  overflow: auto;
`;

interface PracticeSessionProps {}

interface Progress {
  stack: DictionaryEntry[];
  actualRecord?: DictionaryEntry;
}

export const PracticeSession: FC<PracticeSessionProps> = () => {
  const records = useSelector<AppState, DictionaryEntry[]>((s) => s);

  const [progress, setProgress] = useState<Progress>(() => {
    const filteredRecords = records.filter(
      (p) => hasTranslation(p) || hasDefinition(p)
    );

    const stack = groupWith(
      (a, b) => computeAnswersScore(a) === computeAnswersScore(b),
      filteredRecords
    )
      .map((list) => shuffle(list))
      .reduce((prev, curr) => [...prev, ...curr], []);

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
          <div>{progress.actualRecord.translation}</div>
          <div>
            (<i>{progress.actualRecord.partOfSpeech}</i>)
          </div>
        </CardBody>
      </Card>
      <Card>
        <OverflowableCardBody className="text-center">
          {progress.actualRecord.definition}
        </OverflowableCardBody>
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
            I was correct
          </Button>
          <Button theme="danger" onClick={() => handleAnswerButtonClick(false)}>
            I was incorrect
          </Button>
        </>
      )}
    </>
  );
};
