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

import validate from "./Rules";
import notify from "../../utils/toast";

import "./style.css";

const Form = ({ signUpCallback }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
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
        <h3>Sign Up</h3>
        <FormGroup className="mt-3">
          <FormLabel>First Name</FormLabel>
          <input
            required
            className="form-control"
            placeholder="Enter first name"
            value={values.firstName}
            onChange={(event) => {
              setValues({ ...values, firstName: event.target.value });
            }}
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <FormLabel>Last Name</FormLabel>
          <input
            required
            className="form-control"
            placeholder="Enter last name"
            value={values.lastName}
            onChange={(event) => {
              setValues({ ...values, lastName: event.target.value });
            }}
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <FormLabel>Email address</FormLabel>
          <input
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
                    signUpCallback(values);
                  } else {
                    Object.keys(errors).forEach((key) => {
                      notify(errors[key], "error");
                    });
                  }
                }}
              >
                Sign-Up
              </Button>
            </Col>
            <Col sm={12} className="d-flex justify-content-center">
              <Button
                type="button"
                className="btn btn-primary btn-block mt-4 action-btn"
                onClick={() => {navigate("/login")}}
              >
                Sign-In
              </Button>
            </Col>
          </Row>
        </Container>
      </FormComponent>
    </div>
  );
};

export default Form;
