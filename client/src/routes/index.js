import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar/";
import Main from "../pages/Main";
import PersonalCabinet from "../pages/PersonalCabinet";
import Collection from "../pages/Collection";

// Use isAuthenticated ? : ...
const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/personal-cabinet" component={PersonalCabinet} />
          <Route exact path="/personal-collection/:id" component={Collection} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/personal-cabinet" component={PersonalCabinet} />
        <Route exact path="/personal-collection/:id" component={Collection} />
      </Switch>
    </>
  );
};

export default useRoutes;
