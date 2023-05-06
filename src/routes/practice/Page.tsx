import styled from 'styled-components';
import type { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from 'react-bootstrap';
import { PracticeSession } from './components/PracticeSession';
import { Configuration } from './components/Configuration';
import { sessionState } from './store';

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default (() => {
  const [{ isActive }, setSession] = useRecoilState(sessionState);

  const handleEndSessionButtonClick = () => {
    setSession(prevState => ({ ...prevState, config: undefined, queue: [], isActive: false }));
  };

  return (
    <Layout>
      {isActive ? (
        <>
          <PracticeSession />
          <Button onClick={handleEndSessionButtonClick}>End session</Button>
        </>
      ) : (
        <Configuration />
      )}
    </Layout>
  );
}) satisfies FC;
