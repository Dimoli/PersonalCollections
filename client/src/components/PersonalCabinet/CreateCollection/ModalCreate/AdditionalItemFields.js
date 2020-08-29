import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

export default (props) => {
  const { collection, setCollection } = props;

  const onClickCheck = (event) => {
    const fieldName = event.target.id;
    const fieldValue = event.target.checked;

    fieldValue === true
      ? setCollection({
          ...collection,
          itemFields: {
            ...collection.itemFields,
            [fieldName]: ++collection.itemFields[fieldName],
          },
        })
      : setCollection({
          ...collection,
          itemFields: {
            ...collection.itemFields,
            [fieldName]: --collection.itemFields[fieldName],
          },
        });
  };

  return (
    <Col>
      <Modal.Title as="h4" className="text-center">
        Additional item fields
      </Modal.Title>
      <Row className="justify-content-around mt-3">
        <Form.Group>
          <Form.Label>Numeric</Form.Label>
          <Row className="justify-content-center pl-2">
            <Form.Check id="numeric" onClick={onClickCheck} />
            <Form.Check id="numeric" onClick={onClickCheck} />
            <Form.Check id="numeric" onClick={onClickCheck} />
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>One-line</Form.Label>
          <Row className="justify-content-center pl-2">
            <Form.Check id="oneLine" onClick={onClickCheck} />
            <Form.Check id="oneLine" onClick={onClickCheck} />
            <Form.Check id="oneLine" onClick={onClickCheck} />
          </Row>
        </Form.Group>
      </Row>
      <Row className="justify-content-around mt-3">
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Row className="justify-content-center pl-2">
            <Form.Check id="text" onClick={onClickCheck} />
            <Form.Check id="text" onClick={onClickCheck} />
            <Form.Check id="text" onClick={onClickCheck} />
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Row className="justify-content-center pl-2">
            <Form.Check id="date" onClick={onClickCheck} />
            <Form.Check id="date" onClick={onClickCheck} />
            <Form.Check id="date" onClick={onClickCheck} />
          </Row>
        </Form.Group>
      </Row>
      <Row className="justify-content-around mt-2">
        <Form.Group>
          <Form.Label>Boolean</Form.Label>
          <Row className="justify-content-center pl-2">
            <Form.Check id="boolean" onClick={onClickCheck} />
            <Form.Check id="boolean" onClick={onClickCheck} />
            <Form.Check id="boolean" onClick={onClickCheck} />
          </Row>
        </Form.Group>
      </Row>
    </Col>
  );
};
