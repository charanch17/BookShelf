import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_key, GOOGLEBOOKS_GET_URL } from "../../../Api/Api";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "ExploreBooks/get",
  async (payload) => {
    console.log(payload);
    const resp = await axios.get(GOOGLEBOOKS_GET_URL, {
      params: {
        q: payload.searchText ? payload.searchText : "coding",
        maxResults: 10,
        startIndex: payload.startIndex,
        key: api_key,
      },
    });
    return resp.data;
  }
);

export const searchAutoComplete = createAsyncThunk(
  "Suggestions/get",
  async (payload) => {
    const resp = await axios.get(GOOGLEBOOKS_GET_URL, {
      params: {
        q: "intitle:" + payload.searchText,
        maxResults: 5,
        key: api_key,
      },
    });
    var suggestions = [];
    if (resp.data && resp.data.items) {
      resp.data.items.forEach((suggestion) => {
        suggestions.push(suggestion.volumeInfo.title);
      });
    }
    return suggestions;
  }
);
export const setIsLoading =(state,action)=>{
  state.isLoading = true;

}

export const ResetSuggestions = (state, action) => {
  state.searchAutoComplete = [];
};
