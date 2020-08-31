import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import ModalLog from "./ModalLog";

export default () => {
  const [modalShow, setModalShow] = useState(false);
  const [logTitle, setLogTitle] = useState("Sign up");

  return (
    <div className="log">
      <Button
        variant="success"
        onClick={() => {
          setLogTitle("Sign in");
          setModalShow(true);
        }}
      >
        Sign in
      </Button>
      <Button
        variant="danger"
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
