import { FC, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const LazyAuthPage = lazy(() => import('./Page'));

export const AuthRouter: FC = () => (
  <Routes>
    <Route element={<LazyAuthPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);
