import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar/";
import AdminMain from "../pages/AdminMain";
import UserMain from "../pages/UserMain";
import PersonalCabinet from "../pages/PersonalCabinet";
import Collection from "../pages/Collection";
import Item from "../pages/Item";

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
            <Route
              exact
              path="/personal-collection/:idcoll"
              component={Collection}
            />
            <Route
              exact
              path="/personal-collection/:idcoll/item/:iditem"
              component={Item}
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
          <Route
            exact
            path="/personal-collection/:idcoll"
            component={Collection}
          />
          <Route
            exact
            path="/personal-collection/:idcoll/item/:iditem"
            component={Item}
          />
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
