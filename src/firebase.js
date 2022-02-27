import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const config = {
  apiKey: "AIzaSyC1pCU8G_VUoQZWE1eQx8UnTvWicEUXd94",
  authDomain: "journi-13302.firebaseapp.com",
  projectId: "journi-13302",
  storageBucket: "journi-13302.appspot.com",
  messagingSenderId: "111652134810",
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
