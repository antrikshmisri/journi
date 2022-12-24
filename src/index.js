import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, createFirestoreInstance } from "redux-firestore";
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  isLoaded,
} from "react-redux-firebase";
import firebase, { config } from "./firebase";
import { Loading } from "@geist-ui/core";
import { Container } from "react-bootstrap";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase })),
    reduxFirestore(firebase, config)
  )
);

const AuthIsReady = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);

  if (!isLoaded(auth)) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Loading type="warning" />
      </Container>
    );
  } else {
    return children;
  }
};

const profileSpecificProps = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
};

const rrfProps = {
  firebase,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsReady>
          <App />
        </AuthIsReady>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
