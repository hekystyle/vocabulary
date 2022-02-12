import { VFC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PracticePage } from "./Page";

export const PracticeRouter: VFC = () => (
  <Routes>
    <Route path='' element={<PracticePage />} />
    <Route path='*' element={<Navigate to='.' />} />
  </Routes>
);
