import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { CardBody } from "components/CardBody";
import { DictionaryEntry } from "types/DictionaryEntry";
import { AppState, dictionarySlice } from "reducer";
import { useSession } from "./useSession";
import {
  computeAnswersAbsoluteScore,
  computeAnswersRelativeScore,
} from "utils/utils";
import { Config, ScoreAlgorithm } from "./Configuration";
import { useSpeech } from "./useSpeech";

const OverflowableCardBody = styled(CardBody)`
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SCORE_ALGO_MAP = {
  [ScoreAlgorithm.relative]: computeAnswersRelativeScore,
  [ScoreAlgorithm.absolute]: computeAnswersAbsoluteScore,
};

interface PracticeSessionProps {
  config: Config;
}

export const PracticeSession: FC<PracticeSessionProps> = ({
  config: { scoreAlgorithm, playAfterReveal },
}) => {
  const records = useSelector<AppState, DictionaryEntry[]>((s) => s.dictionary);

  const { selected, next } = useSession(
    records,
    SCORE_ALGO_MAP[scoreAlgorithm]
  );

  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const actualRecord = records.find((r) => r.id === selected);

  const { speak } = useSpeech();

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    if (actualRecord && playAfterReveal) speak(actualRecord.word);
  };

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
          {isAnswerRevealed ? (
            <Row>
              {actualRecord.word}
              <Button onClick={() => speak(actualRecord.word)}>
                Play it again
              </Button>
            </Row>
          ) : (
            "?"
          )}
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
