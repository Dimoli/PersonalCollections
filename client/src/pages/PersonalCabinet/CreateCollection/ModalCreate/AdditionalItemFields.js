import React, { useState, useEffect, useMemo } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

import useToast from "../../../../hooks/useToast";

export default (props) => {
  const { collection, setCollection } = props;
  const { CustomToast, showToastMessage } = useToast();
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
        itemFields: itemKeys.reduce((acc, key) => ((acc[key] = []), acc), {}),
      }),
    []
  );

  const onCreateOption = (value, field) => {
    if (field === "numerical" && Number.isNaN(+value)) {
      showToastMessage("Numerical field needs numerical value");

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
      <CustomToast />
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
