import { getFirestoreData } from "../../firebase";

export const createJournal = (journal) => {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    const { putData } = getFirestoreData("journals", uid);

    const updatedField = {
      journals: [journal],
    };

    putData(updatedField).then(() => {
      dispatch({ type: "CREATE_JOURNAL_SUCCESS", journal });
      dispatch(UpdateAllJournals(uid, [journal]));
      dispatch(GetJournalsAtDate(journal.date, false));
    });
  };
};

export const GetJournalsAtDate = (date, convertDate = true) => {
  return (dispatch, getState) => {
    let journalsByDate = getState().journal.journalsByDate;
    const convertedDate = convertDate ? date.toLocaleDateString("en-GB") : date;
    const journalFound = convertedDate in journalsByDate;

    if (journalFound) {
      dispatch({
        type: "GET_JOURNAL_SUCCESS",
        currentJournals: journalsByDate[convertedDate],
      });
    } else {
      dispatch({ type: "GET_JOURNAL_ERROR", err: "No journal found" });
    }
  };
};

export const GetAllJournals = (uid, refetch = true) => {
  return (dispatch, getState) => {
    if (refetch) {
      const { fetchData } = getFirestoreData("journals", uid);

      fetchData()
        .then((data) => {
          dispatch({
            type: "GET_ALL_JOURNALS_SUCCESS",
            journals: data.journals,
            refetch,
          });
        })
        .catch((err) => {
          dispatch({ type: "GET_ALL_JOURNALS_ERROR", err });
        });
    } else {
      const journals = getState().journal.journals;
      dispatch({ type: "GET_ALL_JOURNALS_SUCCESS", journals });
    }
  };
};

export const UpdateAllJournals = (uid, journals) => {
  return (dispatch, getState) => {
    const allJournals = getState().journal.journals.concat(journals);

    dispatch({ type: "UPDATE_ALL_JOURNALS", allJournals });
    dispatch(GetAllJournals(uid, false));
  };
};

export const UpdateJournal = (journal) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const uid = getState().firebase.auth.uid;

    const { putData } = getFirestoreData("journals", uid);

    const updatedField = {
      journals: [journal],
    };

    putData(updatedField).then(() => {
      dispatch({ type: "UPDATE_JOURNAL_SUCCESS", journal });
      dispatch(GetAllJournals(uid, false));
      dispatch(GetJournalsAtDate(journal.date, false));
    });
  };
};
