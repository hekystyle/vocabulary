import { Redirect, Route, Switch } from "react-router-dom";
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
    <StyledApp className="bg-dark">
      <NavBar />
      <StyledContent>
        <Switch>
          <Route path="/record">
            <RecordRouter />
          </Route>
          <Route path="/practice">
            <PracticeRouter />
          </Route>
          <Route path="/list">
            <ListRouter />
          </Route>
          <Route>
            <Redirect to="/list" />
          </Route>
        </Switch>
      </StyledContent>
    </StyledApp>
  );
}
