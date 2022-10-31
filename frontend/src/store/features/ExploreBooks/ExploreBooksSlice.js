import {createSlice} from "@reduxjs/toolkit";
import { initialstate } from "./initialState";
import { fetchBooks,ResetSuggestions,searchAutoComplete, setIsLoading } from "./ExploreBooksReducers";

const ExploreBooksSlice = createSlice(
    {
        name:"ExploreBooks",
        initialState:initialstate,
        reducers:{
            resetSuggestions : ResetSuggestions,
            setIsLoading:setIsLoading
        },
        extraReducers:{ fetchBooks,
            [fetchBooks.fulfilled]:(state,{payload})=>{
              state.data =payload.items
              state.isLoading = false;
            },
            [fetchBooks.rejected]:(state,payload)=>{
                state.isLoading = false;
                throw payload.error
                
            },
            [searchAutoComplete.fulfilled]:(state,{payload})=>{
                state.searchAutoComplete =payload
            }
        }
    }
)

export default ExploreBooksSlice.reducer;
export const ExploreBooksactions = ExploreBooksSlice.actions;