import { createContext } from "react";

const defaultLog = () => {};

export default createContext({
  token: null,
  userId: null,
  divineAccess: null,
  login: defaultLog,
  logout: defaultLog,
  isAuthenticated: false,
  localLang: null,
  changeLocalLang: defaultLog,
});
