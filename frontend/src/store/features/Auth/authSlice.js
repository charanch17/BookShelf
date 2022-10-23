import { createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./initialState";
import{useDispatch} from "react-redux";
import { addCurrentUser, resetCurrentUser,signup,getLoggedInUser, login } from "./authReducers";
export const authSlice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: { addCurrentUser, resetCurrentUser },
  extraReducers:{signup,login,[login.rejected]:(state,payload)=>{
    throw payload.error
  },
    [getLoggedInUser.fulfilled]:(state,{payload})=>{
        state.currentUser = {...payload}
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
