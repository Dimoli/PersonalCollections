import React, { useMemo } from "react";
import { Modal, Form, Toast } from "react-bootstrap";

export default (props) => {
  const { collection, newItem, setNewItem } = props;
  const basicFieldNames = ["name", "tag"];
  const additionalFieldsNames = [
    "numerical",
    "oneLine",
    "temporal",
    "textual",
    "boolean",
  ];

  const onChangeControl = (event) => {
    const itemField = event.target.name;
    const value = event.target.value;
    let updatedField;

    if (typeof newItem[itemField] === "string") {
      updatedField = value;
    } else {
      updatedField = newItem[itemField].slice();
      updatedField[event.target.accessKey] = value;
    }

    setNewItem({
      ...newItem,
      [itemField]: updatedField,
    });
  };

  return (
    <Form noValidate validated>
      {basicFieldNames.map((fieldName, index) => (
        <React.Fragment key={index}>
          <Modal.Title as="h5" className="text-center">
            {fieldName}
          </Modal.Title>
          <Form.Group>
            <Form.Control
              name={fieldName}
              onChange={onChangeControl}
              placeholder={fieldName}
              required
            />
          </Form.Group>
        </React.Fragment>
      ))}
      {additionalFieldsNames.map(
        (fieldName, index) =>
          collection[fieldName] && (
            <React.Fragment key={index}>
              <Modal.Title as="h5" className="text-center">
                {fieldName}
              </Modal.Title>
              {collection[fieldName].map((itemField, fieldId) => (
                <Form.Group key={fieldId}>
                  <Form.Label>{itemField}</Form.Label>
                  <Form.Control
                    accessKey={fieldId}
                    name={fieldName}
                    onChange={onChangeControl}
                    placeholder={itemField}
                    pattern={fieldName === "boolean" ? "true|false" : ".+"}
                    required
                  />
                </Form.Group>
              ))}
            </React.Fragment>
          )
      )}
    </Form>
  );
};
