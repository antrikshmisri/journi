import authReducer from "./authReducer";
import journalReducer from "./journalReducer";
import menuReducer from "./menuReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    journal: journalReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    menu: menuReducer
})

export default rootReducer;