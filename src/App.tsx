import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { RecordPage } from "./RecordPage";
import { ListPage } from "./ListPage";
import { PracticePage } from "./PracticePage";

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export function App() {
  return (
    <StyledApp className="bg-dark">
      <HashRouter>
        <Switch>
          <Route path="/add">
            <RecordPage />
          </Route>
          <Route path="/edit/:id">
            <RecordPage />
          </Route>
          <Route path="/practice">
            <PracticePage />
          </Route>
          <Route path="/">
            <ListPage />
          </Route>
        </Switch>
      </HashRouter>
    </StyledApp>
  );
}
