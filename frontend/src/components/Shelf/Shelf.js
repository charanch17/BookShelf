import React, { useEffect, useState } from "react";
import styles from "./Shelf.module.css";
import MediaScroller from "../MediaScroller/MediaScroller";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentReadingBooks } from "../../store/features/CurrentReading/CurrentReadingReducers";
import { fetchWantToReadBooks } from "../../store/features/WantToRead/WantToReadReducers";
import { fetchReadBooks } from "../../store/features/Read/ReadReducers";
import Tabs from "../UI/Tabs/Tabs";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import { currentReadingActions } from "../../store/features/CurrentReading/CurrentReadingSlice";
import { WantToReadSliceActions } from "../../store/features/WantToRead/WantToReadSlice";
import { ReadSliceActions } from "../../store/features/Read/ReadSlice";
import { AlertActions } from "../../store/features/Alerts/AlertSlice";
const Shelf = () => {
  const CurrentlyReadingBooks = useSelector((state) => {
    return state.currentReading.data;
  });
  const ReadBooks = useSelector((state) => {
    return state.read.data;
  });
  const WantToReadBooks = useSelector((state) => {
    return state.wantToRead.data;
  });

  const isLoading = useSelector((state) => {
    return (
      state.currentReading.isLoading &&
      state.read.isLoading &&
      state.wantToRead.isLoading
    );
  });

  const uid = useSelector((state) => {
    return state.auth.currentUser.uid;
  });
  const [selectedTab, setSelectedTab] = useState("Currently Reading");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentReadingActions.setIsLoading());
    dispatch(WantToReadSliceActions.setIsLoading());
    dispatch(ReadSliceActions.setIsLoading());
    dispatch(fetchCurrentReadingBooks({ uid: uid })).catch((e) => {
      dispatch(AlertActions.setAlert({ alertMessage: e.message }));
    });
    dispatch(fetchWantToReadBooks({ uid: uid })).catch((e) => {
      dispatch(AlertActions.setAlert({ alertMessage: e.message }));
    });
    dispatch(fetchReadBooks({ uid: uid })).catch((e) => {
      dispatch(AlertActions.setAlert({ alertMessage: e.message }));
    });
  }, [dispatch, uid]);

  return (
    <>
      {/* <Navigate to ="/explore"/> */}
      {isLoading && (
        <span className={styles.progressbar}>
          <ProgressBar />
        </span>
      )}
      {!isLoading && (
        <div className={styles.container}>
          {/* <span className={styles.titleContainer}>
            <h3 className={styles.title}>Currently Reading</h3> */}
          {/* <Link to="/explore">
            <PlusCircleIcon className={styles.icon}/>
            </Link> */}
          {/* </span> */}
          {}
          <Tabs
            tabs={[
              {
                title: "Currently Reading",
                isactive: selectedTab === "Currently Reading",
              },
              { title: "Read", isactive: selectedTab === "Read" },
              {
                title: "Want To Read",
                isactive: selectedTab === "Want To Read",
              },
            ]}
            onClick={(title) => {
              setSelectedTab(title);
            }}
          />
          <MediaScroller
            bookList={
              selectedTab === "Currently Reading"
                ? CurrentlyReadingBooks
                : selectedTab === "Read"
                ? ReadBooks
                : WantToReadBooks
            }
            selectedTab={selectedTab}
          />
          {/* <hr/> */}
          {/* <div className={styles.titleContainer}>
            <h2 className={styles.title}>Read</h2>
            <Link to="/explore">
            <PlusCircleIcon className={styles.icon}/>
            </Link>
        </div>
        <hr/>
        <MediaScroller bookList={ReadBooks} /> */}
        </div>
      )}
    </>
  );
};
export default Shelf;
