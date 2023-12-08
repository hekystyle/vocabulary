import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isNil, last } from 'ramda';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useServices } from 'services';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { SpinnerBox } from 'components/SpinnerBox';
import { RETURN_URL_FIELD } from 'routes/records/constants';
import { Term } from 'types/Term';
import { QUERY_KEYS } from 'utils/queryKeys';
import { increaseTermAnswers } from '../api/increaseTermAnswers';
import { sessionState } from '../store';
import { useSpeech } from '../useSpeech';

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

  const { data: actualRecord, isFetching } = useQuery({
    queryKey: QUERY_KEYS.terms.id(actualRecordId),
    queryFn: ({ signal }) => (!isNil(actualRecordId) ? termsRepository.getById(actualRecordId, signal) : undefined),
    enabled: !isNil(actualRecordId),
  });

  const { mutateAsync: increaseAnswersCount, isPending: isMutating } = useMutation({
    mutationFn: async ({ id, isCorrect }: { id: Exclude<Term['id'], undefined>; isCorrect: boolean }) =>
      await increaseTermAnswers(db)(id, isCorrect),
    onSuccess: (_, { id }) => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terms.id(id) }),
  });

  const handleRevealAnswer = () => {
    setSession(prevState => ({ ...prevState, isRevealed: true }));
    if (actualRecord && playAfterReveal) speak(actualRecord.word);
  };

  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (actualRecord?.id === undefined) return;
    increaseAnswersCount({ id: actualRecord.id, isCorrect })
      .then(() => setSession(prevState => ({ ...prevState, queue: prevState.queue.slice(0, -1), isRevealed: false })))
      .catch(console.error);
  };

  const handleEditButtonClick = () => {
    if (actualRecord?.id)
      navigate(`/${actualRecord.id}`, {
        state: {
          [RETURN_URL_FIELD]: pathname,
        },
      });
  };

  if (isFetching) return <SpinnerBox label="Loading term ..." />;
  if (isMutating) return <SpinnerBox label="Updating term answers ..." />;
  if (!actualRecord) return <p>You&apos;ve finished all the terms!</p>;
  return (
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
  );
};
