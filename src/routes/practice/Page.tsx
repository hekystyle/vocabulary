import styled from 'styled-components';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { VFC } from 'react';
import { PracticeSession } from './PracticeSession';
import { Configuration } from './Configuration';

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PracticePage: VFC = () => {
  const isActive = useTypedSelector(s => s.practice.session.isActive);

  return <Layout>{isActive ? <PracticeSession /> : <Configuration />}</Layout>;
};
