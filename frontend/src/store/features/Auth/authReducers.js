import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,onAuthStateChanged ,signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";

// extra reducer redux thunk
export const login = createAsyncThunk(
    "auth/login",
    async (userData)=>{
        await signInWithEmailAndPassword(auth,userData.email,userData.password)
    }
);

// extra reducer redux thunk
export const signup = createAsyncThunk("auth/signup", async (userData) => {
  console.log(userData);
  await createUserWithEmailAndPassword(auth, userData.email, userData.password);
});

export const getLoggedInUser = createAsyncThunk("auth/getLoggedInUser", async () => {
    var data= {email:null,uid:null,phonenumber:null}
    const clean = await onAuthStateChanged(auth, (user) => {
        if (user) {
         data= {
              email: user.email,
              uid: user.uid,
              phonenumber: user.phoneNumber
            }
          ;
        }
      });
      clean()
      return data  
  });


export const addCurrentUser = (state, {payload}) => {
  state.currentUser = {...payload};

  return state;
};

export const resetCurrentUser = (state) => {
  console.log(state.currentUser);

  return state;
};
