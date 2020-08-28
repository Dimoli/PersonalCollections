import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useRoutes from "./routes";
import useAuth from "./hooks/useAuth";
import AuthContext from "./context/auth";

export default () => {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = Boolean(token);
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};
