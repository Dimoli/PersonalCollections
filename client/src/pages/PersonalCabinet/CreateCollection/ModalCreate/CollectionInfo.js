import React from "react";
import { Modal, Form, Col } from "react-bootstrap";

export default (props) => {
  const { collection, setCollection } = props;

  const onChangeControl = (event) => {
    const fieldName = event.target.id;
    const fieldValue = event.target.value;

    setCollection({
      ...collection,
      collectionInfo: { ...collection.collectionInfo, [fieldName]: fieldValue },
    });
  };

  return (
    <Col>
      <Modal.Title as="h4" className="text-center">
        Collection info
      </Modal.Title>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="Collection name"
          id="name"
          onChange={onChangeControl}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="Brief description"
          id="description"
          onChange={onChangeControl}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Description.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Theme</Form.Label>
        <Form.Control
          as="select"
          id="theme"
          onChange={onChangeControl}
          required
        >
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
