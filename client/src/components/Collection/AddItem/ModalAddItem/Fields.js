import React from "react";
import { Modal, Form, Toast } from "react-bootstrap";

export default (props) => {
  const {
    collection,
    newItem,
    setNewItem,
    basicFieldsKeys,
    additionalFieldsKeys,
  } = props;

  const onChangeControl = (event) => {
    const itemField = event.target.name;
    const value = event.target.value;
    let updatedField;

    Array.isArray(newItem[itemField])
      ? (updatedField = newItem[itemField].map((el, index) =>
          index === +event.target.accessKey ? value : el
        ))
      : (updatedField = value);

    setNewItem({
      ...newItem,
      [itemField]: updatedField,
    });
  };

  return (
    <Form noValidate validated>
      {basicFieldsKeys?.map((fieldName, index) => (
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
      {additionalFieldsKeys?.map(
        (fieldName, index) =>
          collection?.itemFields.additional[fieldName].length > 0 && (
            <React.Fragment key={index}>
              <Modal.Title as="h5" className="text-center">
                {fieldName}
              </Modal.Title>
              {collection?.itemFields.additional[fieldName].map(
                (itemField, fieldId) => (
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
                )
              )}
            </React.Fragment>
          )
      )}
    </Form>
  );
};
