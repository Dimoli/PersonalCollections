import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import authContext from "../../context/auth";

import Brand from "./Brand";
import Local from "./Local";
import SearchInput from "./SearchInput";
import DarkMode from "../DarkMode/";
import Loged from "./Loged";
import Entered from "./Entered";

export default () => {
  const { isAuthenticated, logout } = useContext(authContext);

  return (
    <nav className="navbar flex-nowrap fixed-top navbar-dark bg-primary">
      <div>
        <Brand />
        <Local />
        <DarkMode />
      </div>
      <SearchInput />
      {isAuthenticated ? <Entered logout={logout} /> : <Loged />}
    </nav>
  );
};
