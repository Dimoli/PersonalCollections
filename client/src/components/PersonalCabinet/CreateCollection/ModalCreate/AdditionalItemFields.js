import React, { useState, useEffect, useMemo } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

export default (props) => {
  const { collection, setCollection } = props;
  const itemKeys = useMemo(() => Object.keys(collection.itemFields), [
    collection,
  ]);
  const [additionalFields, setAdditionalFields] = useState(
    collection.itemFields
  );

  useEffect(
    () => () =>
      setCollection({
        ...collection,
        itemFields: itemKeys.reduce((acc, key) => {
          acc[key] = [];

          return acc;
        }, {}),
      }),
    []
  );

  const onCreateOption = (value, field) => {
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
      <Modal.Title as="h4" className="text-center">
        Additional item fields
      </Modal.Title>
      {itemKeys.map((field, index) => (
        <Col key={index} className="mb-3">
          <Form.Label className="w-100 text-center">{field}</Form.Label>
          <CreatableSelect
            options={additionalFields[field]}
            onCreateOption={(value) => onCreateOption(value, field)}
          />
        </Col>
      ))}
    </Col>
  );
};
