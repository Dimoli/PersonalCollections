import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import useLocalisation from "./hooks/useLocalisation";
import useRoutes from "./routes";
import AuthContext from "./context/auth";

export default () => {
  const { login, logout, token, userId, divineAccess } = useAuth();
  const { localLang, changeLocalLang } = useLocalisation();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, divineAccess);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        divineAccess,
        isAuthenticated,
        localLang,
        changeLocalLang,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};
