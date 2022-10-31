import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  fetchCurrentReadingBooks,
  addCurrentReadingBook,
  removeCurrentReadingBook,
  setIsLoading,
} from "./CurrentReadingReducers";

const CurrentReadingSlice = createSlice({
  name: "CurrentReading",
  initialState: initialState,
  reducers: {
    setIsLoading :setIsLoading
  },
  extraReducers: {
    fetchCurrentReadingBooks,
    [fetchCurrentReadingBooks.rejected]:(state,payload)=>{
      throw new Error("Unable to Fetch Current Reading Books")
    },
    [fetchCurrentReadingBooks.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.isLoading = false;
    },
    addCurrentReadingBook,
    [addCurrentReadingBook.fulfilled]: (state, { payload }) => {
      if (!payload.exists) {
        state.data.push(payload.data);
      }else{
        throw new Error("Book Exists In your Shelf")
      }
    },
    [addCurrentReadingBook.rejected]:(state,payload)=>{
      throw payload.error
    },
    removeCurrentReadingBook,
    [removeCurrentReadingBook.fulfilled]: (state, { payload }) => {
      state.data = state.data.filter((book) => {
        return book.docId !== payload.docId;
      });
    },
    [removeCurrentReadingBook.rejected]:(state,payload)=>{
      throw payload.error
    }
  },
});
export default CurrentReadingSlice.reducer;

export const currentReadingActions = CurrentReadingSlice.actions;
