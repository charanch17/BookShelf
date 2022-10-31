import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  addReadBook,
  fetchReadBooks,
  removeReadBook,
  setIsLoading,
} from "./ReadReducers";

const ReadSlice = createSlice({
  name: "Read",
  initialState: initialState,
  reducers: { setIsLoading: setIsLoading },
  extraReducers: {
    fetchReadBooks,
    [fetchReadBooks.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.isLoading = false;
    },
    [fetchReadBooks.rejected]: (state, payload) => {
      throw new Error("Unable to Fetch Read Books");
    },
    [addReadBook.fulfilled]: (state, { payload }) => {
      if (!payload.exists) {
        state.data.push({ ...payload.data });
      } else {
        throw new Error("Book Exists In your Shelf");
      }
    },
    [removeReadBook.fulfilled]: (state, { payload }) => {
      state.data = state.data.filter((book) => {
        return book.docId !== payload.docId;
      });
    },
    [removeReadBook.rejected]: (state, payload) => {
      throw payload.error;
    },
  },
});

export default ReadSlice.reducer;
export const ReadSliceActions = ReadSlice.actions;
