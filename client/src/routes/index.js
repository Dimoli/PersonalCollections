import React from "react";
import { Route, Switch } from "react-router-dom";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="" exact>
          12
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="" exact>
        13
      </Route>
    </Switch>
  );
};

export default useRoutes;
