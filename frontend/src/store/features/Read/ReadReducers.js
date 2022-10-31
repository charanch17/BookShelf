import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import app from "../Auth/firebase";

const db = getFirestore(app);
const ReadCollectionRef = collection(db, "Read");

export const fetchReadBooks = createAsyncThunk("Read/get", async (payload) => {
  const q = query(ReadCollectionRef, where("uid", "==", payload.uid));
  const resp = await getDocs(q);
  const data = [];
  resp.forEach((doc) => {
    data.push({ ...doc.data(), docId: doc.id });
  });
  return { data: data };
});

export const addReadBook = createAsyncThunk("Read/post", async (payload) => {
  const q = query(ReadCollectionRef, where("uid", "==", payload.uid));
  var resp = await getDocs(q);
  const alldocs = [];
  resp.forEach((doc) => {
    alldocs.push(doc.data().id);
  });
  if (payload.actiontype !== "move") {
    const WantToReadCollectionRef = collection(db, "WantToRead");
    const currentReadingCollectionRef = collection(db, "CurrentlyReading");
    var q2 = query(WantToReadCollectionRef, where("uid", "==", payload.uid));
    var q3 = query(
      currentReadingCollectionRef,
      where("uid", "==", payload.uid)
    );
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
    resp = await addDoc(ReadCollectionRef, {
      uid: payload.uid,
      ...payload.bookData,
    });

    return { data: { ...payload.bookData, docId: resp.id } };
  } else {
    return { exists: true };
  }
});

export const removeReadBook = createAsyncThunk(
  "Read/delete",
  async (payload) => {
    const docRef = doc(db, "Read", payload.docId);
    const resp = await deleteDoc(docRef);

    return { docId: payload.docId };
  }
);

export const setIsLoading = (state, actions) => {
  state.isLoading = true;
};
