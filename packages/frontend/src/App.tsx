import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar } from '@/components/NavBar';
import { SpinnerBox } from '@/components/SpinnerBox';
import { AuthRouter } from '@/routes/auth/Router';
import { PracticeRouter } from '@/routes/practice';
import { RecordsRouter } from '@/routes/records';
import { LazySeedPage } from '@/routes/seed';

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
          <Route element={<AuthRouter />} path="auth/*" />
          <Route element={<PracticeRouter />} path="practice/*" />
          <Route element={<LazySeedPage />} path="seed" />
          <Route element={<RecordsRouter />} path="*" />
        </Routes>
      </Suspense>
    </StyledContent>
  </StyledApp>
);
