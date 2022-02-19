import styled from 'styled-components';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { VFC } from 'react';
import { PracticeSession } from './components/PracticeSession';
import { Configuration } from './components/Configuration';
import { selectIsActive } from './selectors';

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PracticePage: VFC = () => {
  const isActive = useTypedSelector(selectIsActive);

  return <Layout>{isActive ? <PracticeSession /> : <Configuration />}</Layout>;
};
