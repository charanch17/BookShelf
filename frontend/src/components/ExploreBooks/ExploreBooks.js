import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/features/ExploreBooks/ExploreBooksReducers";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import styles from "./ExploreBooks.module.css";
import Book from "../Book/Book";
import Search from "../Search/Search";
import { addCurrentReadingBook } from "../../store/features/CurrentReading/CurrentReadingReducers";
import { addWantToReadBook } from "../../store/features/WantToRead/WantToReadReducers";
import { addReadBook } from "../../store/features/Read/ReadReducers";
import { ExploreBooksactions } from "../../store/features/ExploreBooks/ExploreBooksSlice";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import { AlertActions } from "../../store/features/Alerts/AlertSlice";

const ExploreBooks = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState();
  var suggestions = useSelector((state) => {
    return state.currentBooks.searchAutoComplete;
  });
  var isLoading = useSelector((state) => {
    return state.currentBooks.isLoading;
  });

  const uid = useSelector((state) => {
    return state.auth.currentUser.uid;
  });
  const [startIndex, setStartIndex] = useState(0);
  const [menuVisibleBook, setMenuVisibleBook] = useState("");
  const currentBooks = useSelector((state) => {
    return state.currentBooks.data;
  });
  const menuActions = (menuItem, bookData) => {
    switch (menuItem) {
      case "Currently Reading":
        dispatch(addCurrentReadingBook({ uid: uid, bookData: bookData })).then(()=>{
          dispatch(AlertActions.setAlert({alertMessage:"Added Book To Current Reading",type:"success"}))
        }).catch((e)=>{
          dispatch(AlertActions.setAlert({alertMessage:e.message}));
        });
        break;
      case "Want To Read":
        dispatch(addWantToReadBook({ uid: uid, bookData: bookData })).then(()=>{
          dispatch(AlertActions.setAlert({alertMessage:"Added Book To Want To Read",type:"success"}))

        }).catch((e)=>{
          dispatch(AlertActions.setAlert({alertMessage:e.message}));
        });
        break;
      case "Read":
        dispatch(addReadBook({ uid: uid, bookData: bookData })).then(()=>{
          dispatch(AlertActions.setAlert({alertMessage:"Added Book To Read",type:"success"}))
        }).catch((e)=>{
          dispatch(AlertActions.setAlert({alertMessage:e.message}));
        });
        break;
      default:
        console.log("hg");
    }
    setMenuVisibleBook("");
  };
  const menuItems = ["Currently Reading", "Want To Read", "Read"];
  useEffect(() => {
    dispatch(ExploreBooksactions.setIsLoading());
    dispatch(fetchBooks({ startIndex: startIndex, searchText: searchInput }));
  }, [startIndex, dispatch, searchInput]);

  return (
    <>
      <div
        className={`${styles.searchcontainer} ${
          suggestions.length > 0 ? styles.activeautocomplete : ""
        } `}
      >
        <Search
          setSearchInput={(val) => {
            setSearchInput(val);
            setStartIndex(0);
          }}
        />
      </div>
      {suggestions.length > 0 && (
        <div className={styles.autocomplete}>
          {suggestions.map((suggestion) => {
            return (
              <span
                className={styles.suggestion}
                onClick={() => {
                  setSearchInput(suggestion);
                  dispatch(ExploreBooksactions.resetSuggestions());
                }}
              >
                {suggestion}
              </span>
            );
          })}
        </div>
      )}
      <div className={styles.searchInput}>
        <hr style={{ width: "99%" }} />
        <h4>Search Results : {searchInput}</h4>
      </div>
      {isLoading && (
        <span className={styles.progressbar}>
          <ProgressBar />
        </span>
      )}
      {!isLoading && (
        <div className={styles.container}>
          {currentBooks &&
            currentBooks.map((book) => {
              return (
                <div className={styles.bookContainer} key={book.id}>
                  <Book
                    menuVisible={book.id === menuVisibleBook}
                    fabClick={(id) => {
                      if (id === menuVisibleBook) {
                        setMenuVisibleBook("");
                      } else {
                        setMenuVisibleBook(id);
                      }
                    }}
                    bookData={book}
                    menuItems={menuItems}
                    menuActions={menuActions}
                  />
                </div>
              );
            })}
        </div>
      )}
      <div className={styles.pagination}>
        <span
          className={`${styles.btnleft} ${styles.btn} `}
          onClick={() => {
            if (!isLoading) {
              setStartIndex((prev) => {
                if (prev < 10) {
                  return 0;
                }

                return prev - 10;
              });
            }
          }}
        >
          <ChevronDoubleLeftIcon className={styles.paginationicons} />
          <h5 className={styles.btntext}>Prev</h5>
        </span>
        <span className={styles.pagenumber}>
          {parseInt(startIndex / 10) + 1}
        </span>
        <span
          className={`${styles.btnright}  ${styles.btn}`}
          onClick={() => {
            if (!isLoading) {
              setStartIndex((prev) => {
                return prev + 10;
              });
            }
          }}
        >
          <h5 className={styles.btntext}>Next</h5>
          <ChevronDoubleRightIcon className={styles.paginationicons} />
        </span>
      </div>
    </>
  );
};
export default ExploreBooks;
