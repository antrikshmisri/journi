const initState = {
  isOpen: false,
};

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case "SWITCH_MENU_STATE":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default menuReducer;
