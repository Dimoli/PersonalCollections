import { createContext } from "react";

const defaultFunction = () => {};

export default createContext({
  token: null,
  userId: null,
  divineAccess: null,
  login: defaultFunction,
  logout: defaultFunction,
  isAuthenticated: false,
  localLang: null,
  changeLocalLang: defaultFunction,
});
