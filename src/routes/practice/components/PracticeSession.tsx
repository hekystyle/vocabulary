import { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { RETURN_URL_FIELD } from 'routes/record/constants';
import { useServices } from 'containers/Services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
import { Term } from 'types/Term';
import { isNil, last } from 'ramda';
import { useRecoilState } from 'recoil';
import { useSpeech } from '../useSpeech';
import { increaseTermAnswers } from '../api/increaseTermAnswers';
import { sessionState } from '../store';

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { speak } = useSpeech();
  const { db, termsRepository } = useServices();
  const queryClient = useQueryClient();
  const [{ queue, isRevealed: isAnswerRevealed, config }, setSession] = useRecoilState(sessionState);
  const actualRecordId = last(queue);
  const playAfterReveal = config?.playAfterReveal ?? false;

  const { data: actualRecord } = useQuery(
    QUERY_KEYS.terms.id(actualRecordId),
    () => (!isNil(actualRecordId) ? termsRepository.getById(actualRecordId) : undefined),
    {
      enabled: !isNil(actualRecordId),
      onError: console.error,
    },
  );

  const { mutateAsync: increaseAnswersCount } = useMutation(
    async ({ id, isCorrect }: { id: Exclude<Term['id'], undefined>; isCorrect: boolean }) =>
      increaseTermAnswers(db)(id, isCorrect),
    {
      onSuccess: (_, { id }) => queryClient.invalidateQueries(QUERY_KEYS.terms.id(id)),
    },
  );

  const handleRevealAnswer = () => {
    setSession(prevState => ({ ...prevState, isRevealed: true }));
    if (actualRecord && playAfterReveal) speak(actualRecord.word);
  };

  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (actualRecord?.id === undefined) return;
    increaseAnswersCount({ id: actualRecord.id, isCorrect })
      .then(() => setSession(prevState => ({ ...prevState, queue: prevState.queue.slice(0, -1), isRevealed: false })))
      .catch(e => console.error(e));
  };

  const handleEndSessionButtonClick = () => {
    setSession(prevState => ({ ...prevState, config: undefined, queue: [], isActive: false }));
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
