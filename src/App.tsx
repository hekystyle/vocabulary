import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
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

export function App() {
  return (
    <HashRouter>
      <StyledApp className="bg-dark">
        <NavBar />
        <Switch>
          <Route path="/record" component={RecordRouter} />
          <Route path="/practice" component={PracticeRouter} />
          <Route path="/list" component={ListRouter} />
          <Redirect to="/list" />
        </Switch>
      </StyledApp>
    </HashRouter>
  );
}
