import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar/index";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="" exact>
          <NavBar />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="" exact>
        <NavBar />
      </Route>
    </Switch>
  );
};

export default useRoutes;
