import React from "react";
import { NavLink } from "react-router-dom";

import Brand from "./Brand";
import Local from "./Local";
import SearchInput from "./SearchInput";
import DarkMode from "../DarkMode/";
import Log from "./Log";

export default () => (
  <nav className="navbar flex-nowrap fixed-top navbar-dark bg-primary">
    <div>
      <Brand />
      <Local />
      <DarkMode />
    </div>
    <SearchInput />
    <NavLink to="/personal-cabinet">
      <i className="fa fa-user-circle-o text-warning" aria-hidden="true" />
    </NavLink>
    <Log />
  </nav>
);
