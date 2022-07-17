import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar } from 'components/NavBar';
import { ListRouter } from 'routes/list';
import { PracticeRouter } from 'routes/practice';
import { RecordRouter } from 'routes/record';

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

export const App: FC = () => (
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
