import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar } from 'components/NavBar';
import { LazyListRouter } from 'routes/list';
import { LazyPracticeRouter } from 'routes/practice';
import { LazyRecordRouter } from 'routes/record';
import { LazySeedPage } from 'routes/seed/Lazy';
import { SpinnerBox } from 'components/SpinnerBox';

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
      <Suspense fallback={<SpinnerBox label="Loading app..." />}>
        <Routes>
          <Route element={<LazyRecordRouter />} path="record/*" />
          <Route element={<LazyPracticeRouter />} path="practice/*" />
          <Route element={<LazyListRouter />} path="list/*" />
          <Route element={<LazySeedPage />} path="seed" />
          <Route element={<Navigate to="/list" />} path="*" />
        </Routes>
      </Suspense>
    </StyledContent>
  </StyledApp>
);
