import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { CardBody } from "components/CardBody";
import { DictionaryEntry } from "types/DictionaryEntry";
import { AppState, dictionarySlice } from "reducer";
import { useSession } from "./useSession";

const OverflowableCardBody = styled(CardBody)`
  overflow: auto;
`;

interface PracticeSessionProps {}

export const PracticeSession: FC<PracticeSessionProps> = () => {
  const records = useSelector<AppState, DictionaryEntry[]>((s) => s);

  const { selected, next } = useSession(records);

  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const actualRecord = records.find((r) => r.id === selected);

  const handleRevealAnswer = () => setIsAnswerRevealed(true);

  const dispatch = useDispatch();
  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (actualRecord)
      dispatch(
        dictionarySlice.actions.answer({
          isCorrect,
          entity: actualRecord,
        })
      );
    setIsAnswerRevealed(false);
    next();
  };

  if (!actualRecord) return null;
  return (
    <>
      <Card>
        <CardBody className="text-center">
          <div>{actualRecord.translation}</div>
          <div>
            (<i>{actualRecord.partOfSpeech}</i>)
          </div>
        </CardBody>
      </Card>
      <Card>
        <OverflowableCardBody className="text-center">
          {actualRecord.definition}
        </OverflowableCardBody>
      </Card>
      <Card>
        <CardBody className="text-center">
          {isAnswerRevealed ? actualRecord.word : "?"}
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
