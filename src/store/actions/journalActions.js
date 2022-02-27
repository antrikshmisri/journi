export const createJournal = (journal) => {
  return (dispatch, getState, { getFirebase }) => {
    // add journal to journals collection in a doc with the user's id and append it to the user's journals array

    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const uid = getState().firebase.auth.uid;
    let journals = [];

    firestore
      .collection("journals")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          journals = [...doc.data().journals];
          journals.push(journal);
        } else {
          journals.push(journal);
        }
      })
      .then(() => {
        return firestore.collection("journals").doc(uid).set({
          journals,
        });
      })
      .then(() => {
        dispatch({ type: "CREATE_JOURNAL_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_JOURNAL_ERROR", err });
      });
  };
};
