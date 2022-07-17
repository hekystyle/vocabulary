import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { RETURN_URL_FIELD } from 'routes/record/constants';
import { useRequest } from 'ahooks';
import { useServices } from 'services/di';
import { useMutation } from 'react-query';
import { useSpeech } from '../useSpeech';
import { selectLastQueueId, selectIsAnswerRevealed, selectPlayAfterReveal } from '../selectors';
import { sessionSlice } from '../reducer';
import { updateTermAnswers } from '../api/updateTermAnswers';

const OverflowableCardBody = styled(Card.Body)`
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const PracticeSession: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { speak } = useSpeech();
  const { db, termsApiClient } = useServices();
  const actualRecordId = useTypedSelector(selectLastQueueId);
  const isAnswerRevealed = useTypedSelector(selectIsAnswerRevealed);
  const playAfterReveal = useTypedSelector(selectPlayAfterReveal);

  const { data: actualRecord } = useRequest(() => termsApiClient.getOne({ id: actualRecordId }), {
    refreshDeps: [actualRecordId],
  });

  const { mutateAsync: updateTermAnswersAsync } = useMutation(updateTermAnswers(db));

  const handleRevealAnswer = () => {
    dispatch(sessionSlice.actions.reveal());
    if (actualRecord && playAfterReveal) speak(actualRecord.word);
  };

  const handleAnswerButtonClick = async (isCorrect: boolean) => {
    if (actualRecord?.id === undefined) return;
    await updateTermAnswersAsync({ id: actualRecord.id, increaseCorrect: isCorrect });
    dispatch(sessionSlice.actions.next());
  };

  const handleEndSessionButtonClick = () => {
    dispatch(sessionSlice.actions.close());
  };

  const handleEditButtonClick = () => {
    if (actualRecord?.id)
      navigate(`/record/${actualRecord.id}`, {
        state: {
          [RETURN_URL_FIELD]: pathname,
        },
      });
  };

  return (
    <>
      {actualRecord && (
        <>
          <Card>
            <Card.Body className="text-center">
              <div>{actualRecord.translation}</div>
              <div>
                (<i>{actualRecord.partOfSpeech}</i>)
              </div>
            </Card.Body>
          </Card>
          <Card>
            <OverflowableCardBody className="text-center">{actualRecord.definition}</OverflowableCardBody>
          </Card>
          <Card>
            <Card.Body className="text-center">
              {isAnswerRevealed ? (
                <Row>
                  {actualRecord.word}
                  <Button onClick={() => speak(actualRecord.word)}>Play it again</Button>
                </Row>
              ) : (
                '?'
              )}
            </Card.Body>
          </Card>
          {!isAnswerRevealed ? (
            <Button onClick={handleRevealAnswer}>Reveal answer</Button>
          ) : (
            <>
              <Button variant="success" onClick={() => handleAnswerButtonClick(true)}>
                I was correct
              </Button>
              <Button variant="danger" onClick={() => handleAnswerButtonClick(false)}>
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
