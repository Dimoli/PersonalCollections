import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Button, Toast } from "react-bootstrap";

import Fields from "./Fields";

export default (props) => {
  const {
    collection,
    setCollection,
    show,
    onHide,
    request,
    loading,
    error,
  } = props;

  const basicFields = useMemo(
    () => Object.keys(collection?.itemFields?.basic || {}),
    [collection]
  );
  const additionalFields = useMemo(
    () => Object.keys(collection?.itemFields?.additional || {}),
    [collection]
  );
  const reduceFields = useCallback(
    (fields) =>
      fields.reduce(
        (acc, field) => (
          (acc[field] =
            fields === basicFields
              ? ""
              : collection?.itemFields?.additional[field]?.slice().fill("")),
          acc
        ),
        {}
      ),
    [basicFields]
  );
  const initialItem = {
    ...reduceFields(basicFields),
    ...reduceFields(additionalFields),
  };

  useEffect(() => setNewItem(initialItem), [collection]);
  const [newItem, setNewItem] = useState({});

  const fieldsProps = {
    collection,
    newItem,
    setNewItem,
    basicFields,
    additionalFields,
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3" className="ml-auto pl-3">
          Item fields
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fields {...fieldsProps} />
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
    console.log(newItem);
    try {
      const updatedCollection = await request("/item/create", "POST", {
        collectionId: collection._id,
        ...newItem,
      });

      setCollection(updatedCollection);
      hideModal();
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
