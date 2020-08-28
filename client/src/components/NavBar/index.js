import React from "react";

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
    <Log />
  </nav>
);
