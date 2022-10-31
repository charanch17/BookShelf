import { createSlice } from "@reduxjs/toolkit";
import { resetAlert, setAlert } from "./AlertReducers";
import { initialState } from "./initialState";

const AlertSlice = createSlice({
  name: "AlertSlice",
  initialState: initialState,
  reducers: {
    resetAlert,
    setAlert,
  },
});

export default AlertSlice.reducer;
export const AlertActions = AlertSlice.actions;
