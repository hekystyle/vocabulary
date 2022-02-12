import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { RecordRouter } from 'routes/record/Router';
import { PracticeRouter } from 'routes/practice/Router';
import { NavBar } from 'NavBar';
import { VFC } from 'react';
import ListRouter from './routes/list';

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
`;

const StyledContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

export const App: VFC = () => (
  <StyledApp className="bg-dark">
    <NavBar />
    <StyledContent>
      <Routes>
        <Route element={<RecordRouter />} path="record/*" />
        <Route element={<PracticeRouter />} path="practice/*" />
        <Route element={<ListRouter />} path="list/*" />
        <Route element={<Navigate to="/list" />} path="*" />
      </Routes>
    </StyledContent>
  </StyledApp>
);
