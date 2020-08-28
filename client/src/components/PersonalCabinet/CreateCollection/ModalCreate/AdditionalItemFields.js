import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

export default () => (
  <Col>
    <Modal.Title as="h4" className="text-center">
      Additional item fields
    </Modal.Title>
    <Row className="justify-content-around mt-3">
      <Form.Group>
        <Form.Label>Numeric</Form.Label>
        <Row className="justify-content-center pl-2">
          <Form.Check />
          <Form.Check />
          <Form.Check />
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>One-line</Form.Label>
        <Row className="justify-content-center pl-2">
          <Form.Check />
          <Form.Check />
          <Form.Check />
        </Row>
      </Form.Group>
    </Row>
    <Row className="justify-content-around mt-3">
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Row className="justify-content-center pl-1">
          <Form.Check />
          <Form.Check />
          <Form.Check />
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Row className="justify-content-center pl-2">
          <Form.Check />
          <Form.Check />
          <Form.Check />
        </Row>
      </Form.Group>
    </Row>
    <Row className="justify-content-around mt-2">
      <Form.Group>
        <Form.Label>Boolean</Form.Label>
        <Row className="justify-content-center pl-2">
          <Form.Check />
          <Form.Check />
          <Form.Check />
        </Row>
      </Form.Group>
    </Row>
  </Col>
);
