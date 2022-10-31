import { createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./initialState";
import {
  addCurrentUser,
  resetCurrentUser,
  signup,
  getLoggedInUser,
  login,
  logout,
  setLoading,
  ResetPassword,
} from "./authReducers";
export const authSlice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: { addCurrentUser, resetCurrentUser, setLoading },
  extraReducers: {
    signup,
    login,
    logout,
    [signup.rejected]: (state, payload) => {
      throw payload.error;
    },
    [login.rejected]: (state, payload) => {
      throw payload.error;
    },
    [getLoggedInUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = { ...payload };
    },
    [ResetPassword.rejected]: (state, payload) => {
      throw payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
