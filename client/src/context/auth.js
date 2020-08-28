import { createContext } from "react";

const defaultLog = () => {};

export default createContext({
  token: null,
  userId: null,
  login: defaultLog,
  logout: defaultLog,
  isAuthenticated: false,
});
