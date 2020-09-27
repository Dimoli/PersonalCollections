import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

import authContext from "../../helpers/context/auth";

export default (props) => {
  const { localLang } = useContext(authContext);

  return (
    <div className="d-flex align-items-center">
      <NavLink className="mr-2 mr-sm-5" to="/personal-cabinet">
        <i
          className="fa fa-user-circle-o text-warning"
          data-placement="top"
          title={localLang.vocabulary.navBar.personalCabinet}
          aria-hidden="true"
        />
      </NavLink>
      <NavLink className="col-1 col-sm-7 overflow-hidden" to="/">
        <Button
          data-placement="top"
          title={localLang.vocabulary.navBar.logout}
          variant="danger"
          onClick={props.logout}
        >
          {localLang.vocabulary.navBar.logout}
        </Button>
      </NavLink>
    </div>
  );
};
