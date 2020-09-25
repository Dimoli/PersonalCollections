import React, { useState, useEffect, useMemo } from "react";
import { Modal, Form, Col, Toast } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

export default (props) => {
  const { collection, setCollection } = props;
  const itemKeys = useMemo(() => Object.keys(collection.itemFields), [
    collection,
  ]);
  const [additionalFields, setAdditionalFields] = useState(
    collection.itemFields
  );
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(
    () => () =>
      setCollection({
        ...collection,
        itemFields: itemKeys.reduce((acc, key) => ((acc[key] = []), acc), {}), //","return last operation
      }),
    []
  );

  const onCreateOption = (value, field) => {
    if (field === "numerical" && Number.isNaN(+value)) {
      setToast({
        show: true,
        message: "Numerical field needs numerical value",
      });

      return;
    }

    setCollection({
      ...collection,
      itemFields: {
        ...collection.itemFields,
        [field]: [...collection.itemFields[field], value],
      },
    });
    setAdditionalFields({
      ...additionalFields,
      [field]: [...additionalFields[field], { label: value, value }],
    });
  };

  return (
    <Col>
      <Modal.Title as="h4" className="position-relative text-center">
        Additional item fields
      </Modal.Title>
      <Toast
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "red",
        }}
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
      {itemKeys.map((field, index) => (
        <Col key={index} className="mb-3">
          <Form.Label className="w-100 text-center">{field}</Form.Label>
          <CreatableSelect
            isClearable
            options={additionalFields[field]}
            onCreateOption={(value) => onCreateOption(value, field)}
          />
        </Col>
      ))}
    </Col>
  );
};
