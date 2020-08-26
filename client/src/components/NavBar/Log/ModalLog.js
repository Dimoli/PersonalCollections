import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalLog = (props) => {
  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3" className="modal-title">
          Log in
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        <p className="p-1 text-right text-info">Forgot Password?</p>
        <LogButton />

        <p className="p-3 text-center">or Sign in with:</p>
        <SocialIcons />
        <p className="pt-3 m-0 text-right">
          Not a member? <span className="text-info">Sign Up</span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const LogButton = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <div className="text-center">
      <Button
        className="log-btn"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Loading…" : "Click to load"}
      </Button>
    </div>
  );
};
const simulateNetworkRequest = () =>
  new Promise((resolve) => setTimeout(resolve, 2000));

const SocialIcons = () => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="social-icon col">
          <i className="fa fa-instagram" aria-hidden="true" />
        </div>
        <div className="social-icon col">
          <i className="fa fa-vk" aria-hidden="true" />
        </div>
        <div className="social-icon col">
          <i className="fa fa-twitter" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default ModalLog;
