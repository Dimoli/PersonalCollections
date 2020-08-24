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
        <LogButton />

        <p className="p-3 text-center">or Sign in with:</p>
        <SocialIcons />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
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
        className="btn-log"
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
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </div>
        <div className="social-icon col">
          <i class="fa fa-vk" aria-hidden="true"></i>
        </div>
        <div className="social-icon col">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default ModalLog;
