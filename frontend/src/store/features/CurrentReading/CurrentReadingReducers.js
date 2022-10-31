import { createAsyncThunk } from "@reduxjs/toolkit";
import app from "../Auth/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
const db = getFirestore(app);
const currentReadingCollectionRef = collection(db, "CurrentlyReading");

export const fetchCurrentReadingBooks = createAsyncThunk(
  "currentReading/get",
  async (payload) => {
    const q = query(
      currentReadingCollectionRef,
      where("uid", "==", payload.uid)
    );
    const resp = await getDocs(q);
    const data = [];
    resp.forEach((doc) => {
      data.push({ ...doc.data(), docId: doc.id });
    });
    return { data };
  }
);

export const removeCurrentReadingBook = createAsyncThunk(
  "currentReading/delete",
  async (payload) => {
    const docRef = doc(db, "CurrentlyReading", payload.docId);

    const resp = await deleteDoc(docRef);
    return { docId: payload.docId };
  }
);

export const addCurrentReadingBook = createAsyncThunk(
  "currentReading/post",
  async (payload) => {
    console.log(payload.uid);
    var q = query(currentReadingCollectionRef, where("uid", "==", payload.uid));

    var resp = await getDocs(q);
    // console.log(resp.docs[0].id, resp.docs[0].data());
    var alldocs = [];
    resp.forEach((doc) => {
      alldocs.push(doc.data().id);
    });
    if (payload.actiontype !== "move") {
      const WantToReadCollectionRef = collection(db, "WantToRead");
      const ReadCollectionRef = collection(db, "Read");
      var q2 = query(WantToReadCollectionRef, where("uid", "==", payload.uid));
      var q3 = query(ReadCollectionRef, where("uid", "==", payload.uid));
      var resp2 = await getDocs(q2);
      var resp3 = await getDocs(q3);
      resp2.forEach((doc) => {
        alldocs.push(doc.data().id);
      });
      resp3.forEach((doc) => {
        alldocs.push(doc.data().id);
      });
    }
    if (!alldocs.includes(payload.bookData.id)) {
      resp = await addDoc(currentReadingCollectionRef, {
        ...payload.bookData,
        uid: payload.uid,
      });
      return { data: { ...payload.bookData, docId: resp.id } };
    } else {
      return { exists: true };
    }
  }
);

export const setIsLoading = (state, actions) => {
  state.isLoading = true;
};
