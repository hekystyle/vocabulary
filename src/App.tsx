import { type FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar } from 'components/NavBar';
import { PracticeRouter } from 'routes/practice';
import { RecordsRouter } from 'routes/records';
import { LazySeedPage } from 'routes/seed';
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
          <Route element={<RecordsRouter />} path="records/*" />
          <Route element={<PracticeRouter />} path="practice/*" />
          <Route element={<LazySeedPage />} path="seed" />
          <Route element={<Navigate to="/records" />} path="*" />
        </Routes>
      </Suspense>
    </StyledContent>
  </StyledApp>
);
