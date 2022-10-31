import React from "react";
import styles from "./MediaScroller.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  addCurrentReadingBook,
  removeCurrentReadingBook,
} from "../../store/features/CurrentReading/CurrentReadingReducers";
import {
  addWantToReadBook,
  removeWantToReadBook,
} from "../../store/features/WantToRead/WantToReadReducers";
import Book from "../Book/Book";
import {
  addReadBook,
  removeReadBook,
} from "../../store/features/Read/ReadReducers";
import { AlertActions } from "../../store/features/Alerts/AlertSlice";

const MediaScroller = (props) => {
  const [menuVisibleBook, setMenuVisibleBook] = useState("");
  const menuItems = [
    "Currently Reading",
    "Want To Read",
    "Read",
    "None",
  ].filter((Item) => {
    return props.selectedTab !== Item;
  });
  const dispatch = useDispatch();
  const uid = useSelector((state) => {
    return state.auth.currentUser.uid;
  });
  const removeaftercopy = (bookData, selectedTab) => {
    if (selectedTab === "Currently Reading") {
      dispatch(removeCurrentReadingBook({ docId: bookData.docId })).catch(
        (e) => {
          dispatch(AlertActions.setAlert({ alertMessage: e.message }));
        }
      );
    } else if (selectedTab === "Read") {
      dispatch(removeReadBook({ docId: bookData.docId })).catch((e) => {
        dispatch(AlertActions.setAlert({ alertMessage: e.message }));
      });
    } else if (selectedTab === "Want To Read") {
      dispatch(removeWantToReadBook({ docId: bookData.docId })).catch((e) => {
        dispatch(AlertActions.setAlert({ alertMessage: e.message }));
      });
    }
  };
  const menuActions = (menuItem, bookData, selectedTab) => {
    switch (menuItem) {
      case "Currently Reading":
        dispatch(
          addCurrentReadingBook({
            uid: uid,
            bookData: bookData,
            actiontype: "move",
          })
        )
          .then(() => {
            removeaftercopy(bookData, selectedTab);
            dispatch(
              AlertActions.setAlert({
                alertMessage: "Book Moved To Currently Reading",
                type: "success",
              })
            );
          })
          .catch((e) => {
            dispatch(AlertActions.setAlert({ alertMessage: e.message }));
          });
        break;
      case "Want To Read":
        dispatch(
          addWantToReadBook({
            uid: uid,
            bookData: bookData,
            actiontype: "move",
          })
        )
          .then(() => {
            removeaftercopy(bookData, selectedTab);
            dispatch(
              AlertActions.setAlert({
                alertMessage: "Book Moved To Want To Read",
                type: "success",
              })
            );
          })
          .catch((e) => {
            dispatch(AlertActions.setAlert({ alertMessage: e.message }));
          });
        break;

      case "Read":
        dispatch(
          addReadBook({ uid: uid, bookData: bookData, actiontype: "move" })
        )
          .then(() => {
            removeaftercopy(bookData, selectedTab);
            dispatch(
              AlertActions.setAlert({
                alertMessage: "Book Moved To Read",
                type: "success",
              })
            );
          })
          .catch((e) => {
            dispatch(AlertActions.setAlert({ alertMessage: e.message }));
          });
        break;

      case "None":
        removeaftercopy(bookData, selectedTab);
        dispatch(
          AlertActions.setAlert({
            alertMessage: "Book Deleted Successfully",
            type: "success",
          })
        );

        break;

      default:
        break;
    }
    setMenuVisibleBook("");
  };

  return (
    <div
      className={`${styles.container} ${props.className} ${
        menuVisibleBook !== "" ? styles.padder : ""
      }`}
    >
      {props.bookList && !props.bookList.length && (
        <Link to="/explore">
          <div className={styles.nobooks}>
            <h3 className={styles.nobookText}>
              {" "}
              No Books found. Click Here to Get some
            </h3>
            <span style={{ width: "2rem", height: "2rem" }}>
              <ShoppingCartIcon />
            </span>
          </div>
        </Link>
      )}
      {props.bookList &&
        props.bookList.map((book) => {
          return (
            <div className={`${styles.element}`} key={book.id}>
              <Book
                menuVisible={book.id === menuVisibleBook}
                fabClick={(id) => {
                  if (id === menuVisibleBook) {
                    setMenuVisibleBook("");
                  } else {
                    setMenuVisibleBook(id);
                  }
                }}
                selectedTab={props.selectedTab}
                bookData={book}
                menuItems={menuItems}
                menuActions={menuActions}
              />
            </div>
          );
        })}
    </div>
  );
};
export default MediaScroller;
