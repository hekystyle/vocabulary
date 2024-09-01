import { FC, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const LazyUpdateRecordPage = lazy(() => import('./UpdatePage'));
const LazyCreateRecordPage = lazy(() => import('./CreatePage'));
const LazyRecordsListPage = lazy(() => import('./ListPage'));

export const RecordsRouter: FC = () => (
  <Routes>
    <Route element={<LazyUpdateRecordPage />} path=":id" />
    <Route element={<LazyCreateRecordPage />} path="create" />
    <Route element={<LazyRecordsListPage />} path="" />
    <Route element={<Navigate to="." />} path="*" />
  </Routes>
);
