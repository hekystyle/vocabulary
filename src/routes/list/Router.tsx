import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ListPage } from './Page';

export const ListRouter: FC = () => (
  <Routes>
    <Route element={<ListPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);

export default ListRouter;
