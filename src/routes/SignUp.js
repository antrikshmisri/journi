import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/actions/authActions";
import Form from "../components/signup/Form";

const SignUp = ({ signUp, isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Form signUpCallback={signUp} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.firebase.auth.uid ? true : false,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
