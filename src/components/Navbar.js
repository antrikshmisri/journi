import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FaBars, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { signOut } from "../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toggle } from "@geist-ui/core";
import { useTheme } from "@geist-ui/core";

const Navbar = ({ signOut, profile, switchMenuState, id, setTheme }) => {
  const navigate = useNavigate();
  const isAuthenticated = profile.isLoaded && !profile.isEmpty;
  const theme = useTheme();

  return (
    <div className="navbar-container" id={id}>
      <Container fluid>
        <Row>
          <Col xs={9} sm={9} md={10}>
            <div className="navbar-brand py-2">
              <Button
                variant="outline-secondary"
                className="btn-block alt-btn btn-dark"
                onClick={switchMenuState}
              >
                <FaBars color="#eef0f2" />
              </Button>
            </div>
          </Col>
          <Col xs={3} sm={3} md={2} className="p-0">
            <Container
              fluid
              className="d-flex justify-content-center align-items-center p-0"
            >
              <Row>
                <Col xs={4} sm={4}>
                  <div className="navbar-theme-toggle py-0 d-flex justify-content-end h-100 align-items-center">
                    <Toggle
                      checked={theme.type === "solardark" ? true : false}
                      onChange={(evt) => {
                        evt.target.checked
                          ? setTheme("solardark")
                          : setTheme("solarlight");
                      }}
                    />
                  </div>
                </Col>
                <Col xs={4} sm={4}>
                  <div className="navbar-signout py-2 d-flex justify-content-end">
                    <Button
                      variant="outline-secondary"
                      className="btn-block alt-btn btn-dark"
                      onClick={
                        isAuthenticated ? signOut : () => navigate("/login")
                      }
                    >
                      {isAuthenticated ? (
                        <FaSignOutAlt />
                      ) : (
                        <FaSignInAlt />
                      )}
                    </Button>
                  </div>
                </Col>
                {isAuthenticated && (
                  <Col xs={4} sm={4}>
                    <div className="navbar-profile py-2 d-flex justify-content-end">
                      <Button
                        variant="outline-secondary"
                        className="btn-block alt-btn btn-dark profile-btn"
                      >
                        {`${profile.firstName[0]}${profile.lastName[0]}`}
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    switchMenuState: () => dispatch({ type: "SWITCH_MENU_STATE" }),
  };
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
