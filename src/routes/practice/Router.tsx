import { type FC, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const LazyPracticePage = lazy(() => import('./Page'));

export const PracticeRouter: FC = () => (
  <Routes>
    <Route element={<LazyPracticePage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);

export default PracticeRouter;
