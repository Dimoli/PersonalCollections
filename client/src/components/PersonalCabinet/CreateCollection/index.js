import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";

import ModalCreate from "./ModalCreate/";

export default (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Col className="add-collection" xs={1}>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Create Collection
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
