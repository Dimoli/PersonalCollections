import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

import authContext from "../../context/auth";

export default (props) => {
  const { localLang } = useContext(authContext);

  return (
    <div className="log">
      <NavLink to="/personal-cabinet">
        <i className="fa fa-user-circle-o text-warning" aria-hidden="true" />
      </NavLink>
      <Button variant="danger" onClick={props.logout}>
        {localLang.vocabulary.main.logout}
      </Button>
    </div>
  );
};
