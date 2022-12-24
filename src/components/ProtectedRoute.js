import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { Button } from "react-bootstrap";
import Menu from "./menu/Menu";

const ProtectedRoute = ({ children, isAuthenticated, setTheme }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return (
        <div id="outer-container" style={{ height: "99%" }}>
        <Navbar setTheme={setTheme}/>
          <Menu>
            <Button className="btn btn-primary btn-block mt-4 action-btn">
              Settings
            </Button>
            <Button className="btn btn-primary btn-block mt-4 action-btn">
              Log-Out
            </Button>
            <Button className="btn btn-primary btn-block mt-4 action-btn">
              Help
            </Button>
          </Menu>
          <main id="page-wrap">{children}</main>
        </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.firebase.auth.uid ? true : false,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
