import React, { useContext } from "react";

import authContext from "../../context/auth";

import Brand from "./Brand";
import Local from "./Local";
import SearchInput from "./SearchInput";
import DarkMode from "../DarkMode/";
import Unloged from "./Unloged/";
import Loged from "./Loged";

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
      {isAuthenticated ? <Loged logout={logout} /> : <Unloged />}
    </nav>
  );
};
