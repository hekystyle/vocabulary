import styled from 'styled-components';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { PracticeSession } from './components/PracticeSession';
import { Configuration } from './components/Configuration';
import { sessionState } from './store';

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PracticePage: FC = () => {
  const { isActive } = useRecoilValue(sessionState);

  return <Layout>{isActive ? <PracticeSession /> : <Configuration />}</Layout>;
};
