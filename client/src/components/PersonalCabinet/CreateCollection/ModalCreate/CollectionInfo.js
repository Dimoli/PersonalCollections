import React from "react";
import { Modal, Form, Col } from "react-bootstrap";

const CollectionInfo = () => {
  return (
    <Col>
      <Modal.Title as="h4" className="text-center">
        Collection info
      </Modal.Title>
      <Form.Group controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Collection name" required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Brief description" required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Description.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupTheme">
        <Form.Label>Theme</Form.Label>
        <Form.Control as="select" required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
    </Col>
  );
};

export default CollectionInfo;
