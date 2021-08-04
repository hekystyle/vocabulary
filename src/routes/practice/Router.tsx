import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { PracticePage } from "./Page";

export function PracticeRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={PracticePage} />
      <Redirect to={path} />
    </Switch>
  );
}
