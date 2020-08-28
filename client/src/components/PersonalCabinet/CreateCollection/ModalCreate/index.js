import React from "react";
import { Modal, Button, Row } from "react-bootstrap";

import CollectionInfo from "./CollectionInfo";
import CollectionImage from "./CollectionImage";
import AdditionalItemFields from "./AdditionalItemFields";

export default (props) => (
  <Modal {...props} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title as="h3" className="ml-auto pl-3">
        Create collection
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <CollectionInfo />
        <CollectionImage />
        <AdditionalItemFields />
      </Row>
      <Row className="justify-content-center pt-2">
        <Button variant="primary">Add collection</Button>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);
