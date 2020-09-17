import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default (props) => {
  return (
    <div className="log">
      <NavLink to="/personal-cabinet">
        <i className="fa fa-user-circle-o text-warning" aria-hidden="true" />
      </NavLink>
      <Button variant="danger" onClick={props.logout}>
        Log out
      </Button>
    </div>
  );
};
