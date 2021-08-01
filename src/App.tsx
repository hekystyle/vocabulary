import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { RecordPage } from "./RecordPage";
import { ListPage } from "./ListPage";
import { PracticePage } from "./PracticePage";

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
`;

export function App() {
  return (
    <StyledApp className="bg-dark">
      <HashRouter>
        <Switch>
          <Route path="/record/:id?">
            <RecordPage />
          </Route>
          <Route path="/practice">
            <PracticePage />
          </Route>
          <Route path="/list">
            <ListPage />
          </Route>
          <Redirect to="/list" />
        </Switch>
      </HashRouter>
    </StyledApp>
  );
}
