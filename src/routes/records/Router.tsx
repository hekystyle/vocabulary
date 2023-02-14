import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateRecordPage } from './CreatePage';
import { RecordsListPage } from './ListPage';
import { UpdateRecordPage } from './UpdatePage';

export const RecordsRouter: FC = () => (
  <Routes>
    <Route element={<UpdateRecordPage />} path=":id" />
    <Route element={<CreateRecordPage />} path="create" />
    <Route element={<RecordsListPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);

export default RecordsRouter;
