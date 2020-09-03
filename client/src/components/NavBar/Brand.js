import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import authContext from "../../context/auth";

export default () => {
  const { isAuthenticated } = useContext(authContext);
  const mainPath = isAuthenticated ? "/personal-cabinet" : "/";

  return (
    <NavLink className="navbar-brand" to={mainPath}>
      PC
    </NavLink>
  );
};
