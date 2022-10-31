import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/Auth/authSlice";
import CurrentReadingSlice from "./features/CurrentReading/CurrentReadingSlice";
import AlertSlice from "./features/Alerts/AlertSlice";
import ExploreBooksSlice from "./features/ExploreBooks/ExploreBooksSlice";
import ReadSlice from "./features/Read/ReadSlice";
import WantToReadSlice from "./features/WantToRead/WantToReadSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    currentBooks: ExploreBooksSlice,
    currentReading: CurrentReadingSlice,
    read: ReadSlice,
    wantToRead: WantToReadSlice,
    alert: AlertSlice,
  },
});

export default store;
