import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  signInWithGoogle,
} from "../store/actions/authActions";
import Form from "../components/login/Form";

const Login = ({
  signIn,
  signInWithGoogle,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      signInCallback={signIn}
      signInWithGoogleCallback={signInWithGoogle}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signInWithGoogle: () => dispatch(signInWithGoogle()),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.firebase.auth.uid ? true : false,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
