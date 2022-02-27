import notify from "../../utils/toast";

const initState = {
  authMessage: {
    type: null,
    message: null,
  },
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      notify("Login Successful!", "success");
      return {
        ...state,
        authMessage: {
          type: "success",
          message: "Login Successful!",
        },
      };

    case "LOGIN_ERROR":
      notify("Login Failed!", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: "Login Failed!",
        },
      };

    case "SIGNOUT_SUCCESS":
      notify("Logout Successful!", "success");
      return {
        ...state,
        authMessage: {
          type: "success",
          message: "Logout Successful!",
        },
      };

    case "SIGNOUT_ERROR":
      notify("Logout Failed!", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: "Logout Failed!",
        },
      };
    
    case "SIGNUP_SUCCESS":
      notify("Signup Successful!", "success");
      return {
        ...state,
        authMessage: {
          type: "success",
          message: "Signup Successful!",
        },
      };
    
    case "SIGNUP_ERROR":
      notify("Signup Failed!", "error");
      return {
        ...state,
        authMessage: {
          type: "error",
          message: "Signup Failed!",
        },
      };

    default:
      return state;
  }
};

export default authReducer;
