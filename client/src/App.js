import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useRoutes from "./routes";
import useAuth from "./hooks/auth";
import AuthContext from "./context/auth";

const App = () => {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <Router>
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
