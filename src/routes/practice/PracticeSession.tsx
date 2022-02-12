import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { last } from 'ramda';
import { dictionarySlice } from 'routes/list/reducer';
import { useNavigate } from 'react-router-dom';
import { selectById } from 'routes/list/adapters';
import { sessionSlice } from './reducer';
import { useSpeech } from './useSpeech';

const OverflowableCardBody = styled(Card.Body)`
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const PracticeSession: VFC = () => {
  const isAnswerRevealed = useTypedSelector(s => s.practice.session.isRevealed);

  const actualRecord = useTypedSelector(s => {
    const termId = last(s.practice.session.stack);
    return termId ? selectById(s, termId) : undefined;
  });

  const { speak } = useSpeech();

  const playAfterReveal = useTypedSelector(s => s.practice.session.config?.playAfterReveal);
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
        }),
      );
    dispatch(sessionSlice.actions.next());
  };

  const handleEndSessionButtonClick = () => {
    dispatch(sessionSlice.actions.close());
  };

  const navigate = useNavigate();
  const handleEditButtonClick = () => {
    if (actualRecord) navigate(`/record/${actualRecord.id}`);
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
