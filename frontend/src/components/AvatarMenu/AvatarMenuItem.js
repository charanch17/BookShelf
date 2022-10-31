import React from "react";
import { Link } from "react-router-dom";
import styles from "./AvatarMenuItem.module.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
const AvatarMenuItem = (props) => {
  return (

   <Link >
      <div className={styles.item} onClick={props.onClick}>
        <span className={styles.icon}>{props.children} </span>
        <span className={styles.title}>{props.title}</span>
        <ChevronRightIcon className={`${styles.icon} ${styles.end}`} />
      </div>
    </Link>
    
  );
};
export default AvatarMenuItem;
