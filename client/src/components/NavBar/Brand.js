import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <NavLink
      className="navbar-brand mr-0 mr-sm-3"
      data-placement="top"
      title="Main page"
      to="/"
    >
      PC
    </NavLink>
  );
};
