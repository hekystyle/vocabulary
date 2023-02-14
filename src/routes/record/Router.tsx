import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateRecordPage } from './CreatePage';
import { UpdateRecordPage } from './UpdatePage';

export const RecordRouter: FC = () => (
  <Routes>
    <Route element={<UpdateRecordPage />} path=":id" />
    <Route element={<CreateRecordPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);

export default RecordRouter;
