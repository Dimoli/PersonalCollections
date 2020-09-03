import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar/";
import AdminMain from "../pages/AdminMain";
import UserMain from "../pages/UserMain";
import PersonalCabinet from "../pages/PersonalCabinet";
import Collection from "../pages/Collection";

// Use isAuthenticated ? : ...
export default (isAuthenticated, divineAccess) => {
  if (isAuthenticated) {
    if (divineAccess) {
      return (
        <>
          <NavBar />
          <Switch>
            <Route
              exact
              path="/personal-cabinet"
              component={() => AdminMain({ divineAccess })}
            />
            <Route component={PersonalCabinet} />
          </Switch>
        </>
      );
    }

    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/personal-cabinet" component={PersonalCabinet} />
          <Route exact path="/personal-collection/:id" component={Collection} />
          <Route component={UserMain} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Route component={UserMain} />
    </>
  );
};
