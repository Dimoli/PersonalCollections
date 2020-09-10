import React, { useState } from "react";
import { Modal, Col, Button, Toast } from "react-bootstrap";

import Fields from "./Fields";

export default (props) => {
  const [newItem, setNewItem] = useState({
    name: "",
    tag: "",
    numerical: [],
    oneLine: [],
    temporal: [],
    textual: [],
    boolean: [],
  });
  const {
    collection,
    setCollection,
    show,
    onHide,
    request,
    loading,
    error,
  } = props;
  // console.log("collection", collection);

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3" className="ml-auto pl-3">
          Item fields
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fields
          collection={collection}
          newItem={newItem}
          setNewItem={setNewItem}
        />
        <AddItemButton
          collection={collection}
          setCollection={setCollection}
          newItem={newItem}
          hideModal={onHide}
          request={request}
          loading={loading}
          error={error}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddItemButton = (props) => {
  const {
    collection,
    setCollection,
    newItem,
    hideModal,
    request,
    loading,
    error,
  } = props;

  const handleAddItem = async () => {
    try {
      const updatedCollection = await request("/item/create", "POST", {
        collectionId: collection._id,
        ...newItem,
      });

      setCollection(updatedCollection);
    } catch (e) {}
  };

  return (
    <div className="text-center">
      <Button
        className="log-btn"
        disabled={loading}
        onClick={!loading ? handleAddItem : null}
      >
        {loading ? "Loading…" : "Add Item"}
      </Button>
    </div>
  );
};
