import { VFC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ListPage } from './Page';

export const ListRouter: VFC = () => (
  <Routes>
    <Route element={<ListPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);
