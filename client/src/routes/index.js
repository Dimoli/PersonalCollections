import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar/";
import AdminMain from "../pages/AdminMain";
import UserMain from "../pages/UserMain/";
import PersonalCabinet from "../pages/PersonalCabinet/";
import Collection from "../pages/Collection/";
import Item from "../pages/Item";

export default (isAuthenticated, divineAccess) => {
  return isAuthenticated ? (
    divineAccess ? (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/collections/:idcoll" component={Collection} />
          <Route exact path="/:useremail/:iduser" component={PersonalCabinet} />
          <Route
            exact
            path="/collections/:idcoll/items/:iditem"
            component={Item}
          />
          <Route exact path="/" component={() => AdminMain({ divineAccess })} />
        </Switch>
      </>
    ) : (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/personal-cabinet" component={PersonalCabinet} />
          <Route exact path="/collections/:idcoll" component={Collection} />
          <Route
            exact
            path="/collections/:idcoll/items/:iditem"
            component={Item}
          />
          <Route component={UserMain} />
        </Switch>
      </>
    )
  ) : (
    <>
      <NavBar />
      <Route component={UserMain} />
    </>
  );
};
