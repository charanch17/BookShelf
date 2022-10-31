import {createSlice} from "@reduxjs/toolkit"
import { initialState } from "./initialState"
import {addWantToReadBook, fetchWantToReadBooks, removeWantToReadBook, setIsLoading} from "./WantToReadReducers"

const WantToReadSlice = createSlice(
    {
        name :"WantToRead",
        initialState:initialState,
        reducers:{setIsLoading:setIsLoading},
        extraReducers:{
            fetchWantToReadBooks,
            [fetchWantToReadBooks.fulfilled]:(state,{payload})=>{
                state.data= payload.data
                state.isLoading = false
            },
            [fetchWantToReadBooks.rejected]:(state,payload)=>{
                throw new Error("Unable to Fetch Want To Read Books")
            },
            [addWantToReadBook.fulfilled]:(state,{payload})=>{
                if(!payload.exists){
                state.data.push({...payload.data});
                }
                else{
                    throw new Error("Book Exists in Your shelf");
                }
            },
            [removeWantToReadBook.fulfilled]:(state,{payload})=>{
                state.data = state.data.filter((book)=>{return book.docId !== payload.docId})
            },
            [removeWantToReadBook.rejected]:(state,payload)=>{
                throw payload.error
            }


        }
    }
)

export default WantToReadSlice.reducer;
export const WantToReadSliceActions = WantToReadSlice.actions;