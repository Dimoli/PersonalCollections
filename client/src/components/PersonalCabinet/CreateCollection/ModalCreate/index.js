import React, { useState } from "react";
import { Modal, Form, Row, Button } from "react-bootstrap";

import CollectionInfo from "./CollectionInfo";
import CollectionImage from "./CollectionImage";
import AdditionalItemFields from "./AdditionalItemFields";

export default (props) => {
  const [collection, setCollection] = useState({
    collectionImage: {},
    collectionInfo: { name: "", description: "", theme: 1 },
    itemFields: { numeric: 0, oneLine: 0, text: 0, date: 0, boolean: 0 },
  });
  const [validated, setValidated] = useState(false);

  const onSubmitForm = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();

    console.log(collection);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3" className="ml-auto pl-3">
          Create collection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <CollectionImage
            collection={collection}
            setCollection={setCollection}
          />
          <Form noValidate validated={validated} onSubmit={onSubmitForm}>
            <CollectionInfo
              collection={collection}
              setCollection={setCollection}
            />
            <Row className="justify-content-center pt-2">
              <Button type="submit" variant="primary" onClick={onClickSubmit}>
                Add collection
              </Button>
            </Row>
          </Form>
          <AdditionalItemFields
            collection={collection}
            setCollection={setCollection}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
