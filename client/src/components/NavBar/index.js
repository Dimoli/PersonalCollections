import React, { useContext } from "react";

import authContext from "../../helpers/context/auth";

import Brand from "./Brand";
import Local from "./Local";
import SearchInput from "./SearchInput";
import DarkMode from "../DarkMode/";
import Unloged from "./Unloged/";
import Loged from "./Loged";

export default () => {
  const { isAuthenticated, logout } = useContext(authContext);

  return (
    <nav className="navbar flex-nowrap fixed-top justify-content-between navbar-dark bg-primary">
      <div className="d-flex align-items-center">
        <Brand />
        <Local />
        <DarkMode />
      </div>
      <SearchInput />
      {isAuthenticated ? <Loged logout={logout} /> : <Unloged />}
    </nav>
  );
};
