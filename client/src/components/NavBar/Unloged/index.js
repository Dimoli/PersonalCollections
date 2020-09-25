import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import ModalLog from "./ModalLog";

export default () => {
  const [modalShow, setModalShow] = useState(false);
  const [logTitle, setLogTitle] = useState("Sign up");

  return (
    <div className="d-flex pr-0 pr-sm-5">
      <Button
        className="col-4 col-sm-6 mx-1 mx-sm-3 overflow-hidden"
        data-placement="top"
        title="Sign in"
        variant="success"
        onClick={() => {
          setLogTitle("Sign in");
          setModalShow(true);
        }}
      >
        Sign in
      </Button>
      <Button
        className="col-4 col-sm-6 overflow-hidden"
        data-placement="top"
        title="Sign up"
        variant="secondary"
        onClick={() => {
          setLogTitle("Sign up");
          setModalShow(true);
        }}
      >
        Sign up
      </Button>

      <ModalLog
        show={modalShow}
        logTitle={logTitle}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
