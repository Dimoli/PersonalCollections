import React, { useState, useContext } from "react";
import { Modal, Form, Row, Button } from "react-bootstrap";

import CollectionInfo from "./CollectionInfo";
import CollectionImage from "./CollectionImage";
import AdditionalItemFields from "./AdditionalItemFields";
import useHttp from "../../../../hooks/useHttp";
import authContext from "../../../../context/auth";

export default (props) => {
  const { collections, setCollections } = props;
  const [collection, setCollection] = useState({
    collectionImage: {},
    collectionInfo: { name: "", description: "", theme: 1 },
    itemFields: {
      numerical: [],
      oneLine: [],
      textual: [],
      temporal: [],
      boolean: [],
    },
  });
  const [validated, setValidated] = useState(false);
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);

  const onFormClick = async (event) => {
    const form = event.currentTarget;

    if (event.target.id === "submit")
      form.checkValidity()
        ? setCollections(
            await request("collections/create", "POST", {
              ...collection,
              userId,
            })
          ) || props.onHide()
        : setValidated(true);
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
          <Form noValidate validated={validated} onClick={onFormClick}>
            <CollectionInfo
              collection={collection}
              setCollection={setCollection}
            />
            <Row className="justify-content-center pt-5">
              <Button id="submit" className="primary mt-3">
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