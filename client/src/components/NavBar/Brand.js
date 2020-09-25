import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import authContext from "../../context/auth";

export default () => {
  const { isAuthenticated } = useContext(authContext);

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
