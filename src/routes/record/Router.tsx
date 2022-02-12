import { VFC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecordPage } from "./Page";

export const RecordRouter: VFC = () => (
  <Routes>
    <Route path=':id' element={<RecordPage />} />
    <Route path='' element={<RecordPage />} />
    <Route path='*' element={<Navigate to='.' />} />
  </Routes>
);
