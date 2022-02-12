import { VFC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PracticePage } from './Page';

export const PracticeRouter: VFC = () => (
  <Routes>
    <Route element={<PracticePage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);
