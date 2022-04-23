import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RecordPage } from './Page';

export const RecordRouter: FC = () => (
  <Routes>
    <Route element={<RecordPage />} path=":id" />
    <Route element={<RecordPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);
