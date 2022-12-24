import notify from "../../utils/toast";

const initState = {
  journals: [],
  journalsByDate: {},
};

const journalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_JOURNAL_SUCCESS":
      const { journalsByDate } = state;
      const {
        journal: { date },
      } = action;

      const journalsAtDate = journalsByDate[date] || [];

      notify("Journal Created!", "success");

      return {
        ...state,
        authMessage: {
          type: "success",
          message: "Journal Created!",
        },
        journalsByDate: {
          ...journalsByDate,
          [date]: [...journalsAtDate, action.journal],
        },
      };
    case "CREATE_JOURNAL_ERROR":
      notify(action.err || "Error in creating the journal", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: action.err || "Error in creating the journal",
        },
      };
    case "GET_JOURNAL_SUCCESS":
      notify("Journal Retrieved!", "success");
      return {
        ...state,
        currentJournals: action.currentJournals,
      };
    case "GET_JOURNAL_ERROR":
      notify(action.err, "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: action.err,
        },
        currentJournals: null,
      };
    case "GET_ALL_JOURNALS_SUCCESS":
      const { journals } = action;
      const baseState = {
        ...state,
        journals: action.journals,
      };

      /**
       * Only rebuild the journalsByDate object if the journals are being refetched
       * from the database.
       */
      if (action.refetch) {
        let tempJournalsByDate = {};

        journals.forEach((journal) => {
          const { date } = journal;

          if (date in tempJournalsByDate) {
            tempJournalsByDate[date].push(journal);
          } else {
            tempJournalsByDate[date] = [journal];
          }
        });

        return {
          ...baseState,
          journalsByDate: tempJournalsByDate,
        };
      }

      return {
        ...state,
        journals: action.journals,
      };
    case "GET_ALL_JOURNALS_ERROR":
      notify(action.err || "Error retireving all journals", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: action.err || "Error retireving all journals",
        },
      };
    case "UPDATE_JOURNAL_SUCCESS":
      notify("Journal Updated!", "success");
      const updatedJournal = action.journal;
      const updatedJournalDate = updatedJournal.date;
      const journalsDateArray = state.journalsByDate[updatedJournalDate]

      const updatedJournalsDateArray = journalsDateArray.map(journal => {
        if (journal.id === updatedJournal.id) {
          return updatedJournal
        }
        return journal
      })

      return {
        ...state,
        authMessage: {
          type: "success",
          message: "Journal Updated!",
        },
        journalsByDate: {
          ...state.journalsByDate,
          [updatedJournalDate]: updatedJournalsDateArray
        }
      };
    case "UPDATE_JOURNAL_ERROR":
      notify(action.err || "Error in updating the journal", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: action.err || "Error in updating the journal",
        },
      };
    case "UPDATE_ALL_JOURNALS":
      notify("All Journals Updated!", "success");
      return {
        ...state,
        journals: action.allJournals,
      };
    default:
      return state;
  }
};

export default journalReducer;
