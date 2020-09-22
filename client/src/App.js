import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";

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
      <IntlProvider locale={localLang.local} message={localLang.lang}>
        <Router>{routes}</Router>
      </IntlProvider>
    </AuthContext.Provider>
  );
};
