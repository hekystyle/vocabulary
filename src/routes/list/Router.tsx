import { VFC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListPage } from "./Page";

export const ListRouter: VFC = () => (
  <Routes>
    <Route path='' element={<ListPage />} />
    <Route path='*' element={<Navigate to='.' />} />
  </Routes>
);
