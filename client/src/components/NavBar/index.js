import React from "react";

import Brand from "./Brand";
import SearchInput from "./SearchInput";
import Log from "./Log";

const NavBar = () => {
  return (
    <nav className="flex-nowrap navbar fixed-top navbar-dark bg-primary">
      <Brand />
      <SearchInput />
      <Log />
    </nav>
  );
};

export default NavBar;
