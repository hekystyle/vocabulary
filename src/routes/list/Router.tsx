import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ListPage } from "./Page";

export function ListRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} component={ListPage} />
    </Switch>
  );
}
