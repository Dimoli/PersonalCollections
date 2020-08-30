import React from "react";
import { NavLink } from "react-router-dom";

export default () => (
  <NavLink className="navbar-brand" to="/">
    <i className="fa fa-globe pl-2" aria-hidden="true" />
  </NavLink>
);
