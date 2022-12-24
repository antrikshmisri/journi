import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormLabel,
  FormGroup,
  Form as FormComponent,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FaGoogle, FaApple, FaGithub } from "react-icons/fa";
import validate from "./Rules";
import notify from "../../utils/toast";

import "./style.css";

const Form = ({ signInCallback, signInWithGoogleCallback }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="login-container p-0 m-0">
      <FormComponent
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="form"
      >
        <h3>Sign In</h3>
        <FormGroup className="mt-3">
          <FormLabel>Email address</FormLabel>
          <input
            label="Email"
            required
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={values.email}
            onChange={(event) => {
              setValues({ ...values, email: event.target.value });
            }}
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <FormLabel>Password</FormLabel>
          <input
            label="Password"
            required
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={values.password}
            onChange={(event) => {
              setValues({ ...values, password: event.target.value });
            }}
          />
        </FormGroup>
        <Container fluid className="d-flex justify-content-center">
          <Row>
            <Col sm={12} className="d-flex justify-content-center">
              <Button
                type="submit"
                className="btn btn-primary btn-block mt-4 action-btn"
                onClick={() => {
                  let errors = validate(values);

                  if (Object.keys(errors).length === 0) {
                    signInCallback(values);
                  } else {
                    Object.keys(errors).forEach((key) => {
                      notify(errors[key], "error");
                    });
                  }
                }}
              >
                Sign-In
              </Button>
            </Col>
            <Col sm={12} className="d-flex justify-content-center">
              <Button
                type="submit"
                className="btn btn-primary btn-block mt-4 action-btn"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign-Up
              </Button>
            </Col>
          </Row>
        </Container>
        <h3 className="mt-4 text-center">Or</h3>
        <Container className="mt-4 alt-login-btns" style={{ width: "70%" }}>
          <Row>
            <Col sm={4}>
              <Button
                variant="outline-secondary"
                className="btn-block alt-btn btn-dark"
                onClick={signInWithGoogleCallback}
              >
                <FaGoogle />
              </Button>
            </Col>
            <Col sm={4}>
              <Button
                variant="outline-secondary"
                className="btn-block alt-btn btn-dark"
              >
                <FaApple />
              </Button>
            </Col>
            <Col sm={4}>
              <Button
                variant="outline-secondary"
                className="btn-block alt-btn btn-dark"
              >
                <FaGithub />
              </Button>
            </Col>
          </Row>
        </Container>
      </FormComponent>
    </div>
  );
};

export default Form;
