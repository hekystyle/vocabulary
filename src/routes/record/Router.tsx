import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { RecordPage } from "./Page";

export function RecordRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id?`} component={RecordPage} />
      <Redirect to={`${path}`} />
    </Switch>
  );
}
