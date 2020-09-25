import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";

import ModalCreate from "./ModalCreate/";

export default (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Col className="add-collection">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          <i className="fa fa-plus" aria-hidden="true" />
        </Button>
      </Col>
      <ModalCreate
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </>
  );
};
