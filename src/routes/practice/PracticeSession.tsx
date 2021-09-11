import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { CardBody } from "components/CardBody";
import { useSpeech } from "./useSpeech";
import { useTypedSelector } from "hooks/useTypedSelector";
import { last } from "ramda";
import { sessionSlice } from "./reducer";
import { dictionarySlice } from "routes/list/reducer";
import { useHistory } from "react-router";
import { selectById } from "routes/list/adapters";

const OverflowableCardBody = styled(CardBody)`
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

interface PracticeSessionProps {}

export const PracticeSession: FC<PracticeSessionProps> = () => {
  const isAnswerRevealed = useTypedSelector(
    (s) => s.practice.session.isRevealed
  );

  const actualRecord = useTypedSelector((s) => {
    const termId = last(s.practice.session.stack);
    return termId ? selectById(s, termId) : undefined;
  });

  const { speak } = useSpeech();

  const playAfterReveal = useTypedSelector(
    (s) => s.practice.session.config?.playAfterReveal
  );
  const dispatch = useDispatch();

  const handleRevealAnswer = () => {
    dispatch(sessionSlice.actions.reveal());
    if (actualRecord && playAfterReveal) speak(actualRecord.word);
  };

  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (actualRecord)
      dispatch(
        dictionarySlice.actions.answer({
          isCorrect,
          entity: actualRecord,
        })
      );
    dispatch(sessionSlice.actions.next());
  };

  const handleEndSessionButtonClick = () => {
    dispatch(sessionSlice.actions.close());
  };

  const history = useHistory();
  const handleEditButtonClick = () => {
    history.push(`record/${actualRecord?.id}`);
  };

  return (
    <>
      {actualRecord && (
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
              <Button
                theme="success"
                onClick={() => handleAnswerButtonClick(true)}
              >
                I was correct
              </Button>
              <Button
                theme="danger"
                onClick={() => handleAnswerButtonClick(false)}
              >
                I was incorrect
              </Button>
            </>
          )}
          <Button onClick={handleEditButtonClick}>Edit current term</Button>
        </>
      )}
      <Button onClick={handleEndSessionButtonClick}>End session</Button>
    </>
  );
};
