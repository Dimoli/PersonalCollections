import React, { useState, useEffect, useContext } from "react";
import { Modal, Col, Button, Form, Toast } from "react-bootstrap";

import useHttp from "../../../hooks/useHttp";
import authContext from "../../../context/auth";

import getCoords from "../../../coords/";

export default (props) => {
  // const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const onChangeControl = (event) => {
    setForm({ ...form, [event.target.type]: event.target.value });
  };

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3" className="ml-auto pl-3">
          {props.logTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={onChangeControl}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={onChangeControl}
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <p className="p-1 text-right text-info">Forgot Password?</p>
        <LogButton
          form={form}
          requestType={props.logTitle}
          hideModal={props.onHide}
        />

        <p className="p-3 text-center">or Sign in with:</p>
        <SocialIcons />
        <p className="pt-3 m-0 text-right">
          Not a member? <span className="text-info">Sign Up</span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        {/*         <Col>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img src="" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </Col> */}
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const LogButton = (props) => {
  const { request, loading, error } = useHttp();
  const { login, token, userId } = useContext(authContext);
  const requestType =
    props.requestType === "Sign up" ? "registration" : "authentication";

  const handleButtonClick = async () => {
    try {
      const data = await request(`auth/${requestType}`, "POST", {
        ...props.form,
        coords: getCoords(),
      });

      login(data.token, data.userId, data.divineAccess, data.active);

      if (data?.token) props.hideModal();
    } catch (e) {}
  };

  return (
    <div className="text-center">
      <Button
        className="log-btn"
        disabled={loading}
        onClick={!loading ? handleButtonClick : null}
      >
        {loading ? "Loading…" : "Click to load"}
      </Button>
    </div>
  );
};

const SocialIcons = () => {
  const { request, loading, error } = useHttp();
  const { login, token, userId } = useContext(authContext);

  const handleIconClick = async (event) => {
    console.log("handleIconClick -> event", event);
    try {
      const data = await request(`auth/vkontakte`);

      /*       login(data.token, data.userId, data.divineAccess, data.active);

      if (data?.token) props.hideModal(); */
    } catch (e) {}
  };

  return (
    <div className="container">
      <div className="row text-center">
        <div className="social-icon col">
          <i className="fa fa-facebook" aria-hidden="true" />
        </div>
        <div className="social-icon col">
          <i className="fa fa-google" aria-hidden="true" />
        </div>
        <div
          className="social-icon col"
          id="vkontakte"
          onClick={handleIconClick}
        >
          <i className="fa fa-vk" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
