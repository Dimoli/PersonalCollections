import { createContext } from "react";

const defaultLog = () => {};

const AuthContext = createContext({
  token: null,
  userId: null,
  login: defaultLog,
  logout: defaultLog,
  isAuthenticated: false,
});

export default AuthContext;
