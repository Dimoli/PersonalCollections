import React from "react";
import { NavLink } from "react-router-dom";

import Collections from "../components/PersonalCabinet/Collections";

export default () => (
  <div className="d-flex p-5">
    <Collections />
    <NavLink to="/personal-cabinet">qwe</NavLink>
  </div>
);
