import notify from "../../utils/toast";

const initState = {
  journals: [],
};

const journalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_JOURNAL_SUCCESS":
      notify("Journal Created!", "success");
      return {
        ...state,
        authMessage: {
          type: "success",
          message: "Journal Created!",
        },
      };
    case "CREATE_JOURNAL_ERROR":
      notify("Journal Creation Failed!", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: "Journal Creation Failed!",
        },
      };
    default:
      return state;
  }
};

export default journalReducer;
