import React, { useState, useEffect, useContext } from "react";
import { Modal, Col, Button, Form, Toast } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import VkLogin from "react-vkontakte-login";

import useHttp from "../../../hooks/useHttp";
import authContext from "../../../context/auth";

import getCoords from "../../../coords";

export default (props) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const { login } = useContext(authContext);
  const requestType =
    props.logTitle === "Sign up" ? "registration" : "authentication";

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
          requestType={requestType}
          showToast={showToast}
          setShowToast={setShowToast}
          login={login}
          hideModal={props.onHide}
        />
        <p className="p-3 text-center">or Sign in with:</p>
        <SocialIcons
          requestType={requestType}
          login={login}
          hideModal={props.onHide}
        />
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

const LogButton = (props) => {
  const {
    form,
    requestType,
    showToast,
    setShowToast,
    login,
    hideModal,
  } = props;
  const { request, loading, error } = useHttp();

  const handleButtonClick = async () => {
    try {
      const data = await request(`auth/${requestType}`, "POST", {
        ...form,
        coords: getCoords(),
      });

      login(data.token, data.userId, data.divineAccess, data.active);
      hideModal();
    } catch (e) {
      setShowToast();
    }
  };

  return (
    <div className="text-center">
      <Toast
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "red",
        }}
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
      >
        <Toast.Body>{error}</Toast.Body>
      </Toast>
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

const SocialIcons = (props) => {
  const { requestType, login, hideModal } = props;
  const { request, loading, error } = useHttp();

  const handleIconClick = async (res, socialType) => {
    try {
      let socialData;

      if (socialType === "facebook") {
        socialData = {
          password: res.userID,
          email: res.name,
          coords: getCoords(),
        };
      } else if (socialType === "google") {
        socialData = {
          password: res.googleId,
          email: res.profileObj.email,
          coords: getCoords(),
        };
      } else if (socialType === "vk") {
        socialData = {
          password: res.session.mid,
          email: `${res.session.user.first_name} ${res.session.user.last_name}`,
          coords: getCoords(),
        };
      }

      const data = await request(
        `oauth/${socialType}/${requestType}`,
        "POST",
        socialData
      );

      login(data.token, data.userId, data.divineAccess, data.active);

      if (data?.token) hideModal();
    } catch (e) {}
  };

  return (
    <div className="container">
      <div className="row text-center">
        <FacebookLogin
          appId="3045554218900924"
          callback={(res) => handleIconClick(res, "facebook")}
          render={(renderProps) => (
            <div className="social-icon col" onClick={renderProps.onClick}>
              <i className="fa fa-facebook" aria-hidden="true" />
            </div>
          )}
        />
        <VkLogin
          apiId="7586468"
          callback={(res) => handleIconClick(res, "vk")}
          render={(renderProps) => (
            <div className="social-icon col" onClick={renderProps.onClick}>
              <i className="fa fa-vk" aria-hidden="true" />
            </div>
          )}
        />
        <GoogleLogin
          clientId="288283646072-mdc61s44k457va68oepmn0jaqm36jo89.apps.googleusercontent.com"
          onSuccess={(res) => handleIconClick(res, "google")}
          // onFailure={handleIconClick}
          render={(renderProps) => (
            <div className="social-icon col" onClick={renderProps.onClick}>
              <i className="fa fa-google" aria-hidden="true" />
            </div>
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};
