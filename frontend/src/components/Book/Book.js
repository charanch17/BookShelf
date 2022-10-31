import React, { useEffect, useState } from "react";
import styles from "./Book.module.css";
import Card from "../UI/Card/Card";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Menu from "../UI/Menu/Menu";
import Fab from "../Fab/Fab";
const Book = (props) => {
  const menuVisible = props.menuVisible;

  return (
    <div>
      <Card className={styles.book}>
        <div className={styles.container}>
          {props.bookData.volumeInfo.imageLinks && (
            <img
              src={props.bookData.volumeInfo.imageLinks.thumbnail}
              alt={props.bookData.volumeInfo.imageLinks.smallThumbnail}
              className={styles.image}
            />
          )}
          <h5 className={styles.title}>{props.bookData.volumeInfo.title}</h5>
          {props.bookData.volumeInfo.authors && (
            <h6 className={styles.author}>
              {props.bookData.volumeInfo.authors[0]}
            </h6>
          )}
        </div>
      </Card>
      {/* {menuVisible && (
        <Menu
          bookData={props.bookData}
          menuItems={props.menuItems}
          menuActions={props.menuActions}
        />
      )} */}

      <span className={styles["pseudo-placeholder"]}>
        {/* <span className={styles.fab} id="fab" onClick={()=>{props.fabClick(props.bookData.id)}}>
       {!menuVisible && <ChevronDownIcon className={styles.fabicon} />}
       {menuVisible && <ChevronUpIcon className={styles.fabicon}/>}
     </span> */}
        <Fab
          bookData={props.bookData}
          menuItems={props.menuItems}
          menuActions={props.menuActions}
          menuVisible={menuVisible}
          selectedTab={props.selectedTab}
          onClick={() => {
            props.fabClick(props.bookData.id);
          }}
        />
      </span>
    </div>
  );
};
export default Book;
