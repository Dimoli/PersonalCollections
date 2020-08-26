import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import ModalLog from "./ModalLog";

const Log = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="log">
      <Button variant="success" onClick={() => setModalShow(true)}>
        Sign in
      </Button>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Sign up
      </Button>

      <ModalLog show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Log;
