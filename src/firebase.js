import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

// Get the firebase config by fetcging it from the firebaseConfig.json, firebaseConfig.result.sdkConfig is the config object
const firebaseConfig = require("./firebaseConfig.json");
export const config = firebaseConfig.result.sdkConfig;

// Initialize firebase with the config object
const app = firebase.initializeApp(config);
firebase.firestore();

const firestore = getFirestore(app);

/**
 * Function to preform firestore actions.
 * @param {string} collection - firestore collection name
 * @param {string} id - firestore document id
 * @returns {object} - object containing action functions
 */
const getFirestoreData = (collection, id) => {
  /**
   * Update the document in firestore.
   * @param {object} data - key value pair of data to be stored in firestore
   * @param {*} docRef - firestore document reference
   */
  const _updateDoc = async (data, docRef) => {
    Object.entries(data).forEach(([key, value]) => {

      if (Array.isArray(value)) {
        return updateDoc(docRef, {
          [key]: arrayUnion(...value),
        });
      }

      return updateDoc(docRef, {
        [key]: value,
      });
    });
  };

  const _createDoc = async (data, docRef) => setDoc(docRef, data);

  /**
   * Put data into firestore
   * @param {object} data - key value pair of data to be stored in firestore
   */
  const _putData = async (data) => {
    /**
     * Check if the document exists, if it does, update the document,
     * if it doesn't, create a new document.
     */
    const docRef = doc(firestore, collection, id);

    return _updateDoc(data, docRef);
  };

  const _fetchData = async () => {
    let fetchedData = null;

    try {
      const docRef = doc(firestore, collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        fetchedData = docSnap.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document, creating a new document!", docRef);

        _createDoc({}, docRef).then(() => {
          fetchedData = {};
        })
      }
    } catch (error) {
      console.log(error);
    }

    return fetchedData || {};
  };

  return { fetchData: _fetchData, putData: _putData };
};

export default firebase;
export { getFirestoreData };
