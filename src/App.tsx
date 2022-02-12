import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { RecordRouter } from "routes/record/Router";
import ListRouter from "./routes/list";
import { PracticeRouter } from "routes/practice/Router";
import { NavBar } from "NavBar";

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
`;

const StyledContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

export function App() {
  return (
    <StyledApp className='bg-dark'>
      <NavBar />
      <StyledContent>
        <Routes>
          <Route path='record/*' element={<RecordRouter />} />
          <Route path='practice/*' element={<PracticeRouter />} />
          <Route path='list/*' element={<ListRouter />} />
          <Route path='*' element={<Navigate to='/list' />} />
        </Routes>
      </StyledContent>
    </StyledApp>
  );
}
