import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const View = ({ data, uid, firestore }) => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    if ("journals" in data) {
      if (uid in data.journals) {
        data["journals"][uid] && setJournals(data["journals"][uid]["journals"]);
      }
    }
  }, [data]);

  return (
    <div className="view">
      {journals &&
        journals.map((journal) => {
          return (
            <div key={journal.id}>
              <h1>{journal.title}</h1>
              <p>{journal.content}</p>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.firestore.data,
    uid: state.firebase.auth.uid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "journals" }])
)(View);
