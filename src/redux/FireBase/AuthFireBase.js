import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authError: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginError(state) {
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    },
    loginSuccess(state) {
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    },
    signOutSuccess(state) {
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    },
    signUpSuccess(state) {
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    },
    signUpError(state) {
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    },
  },
});

export default authReducer;
