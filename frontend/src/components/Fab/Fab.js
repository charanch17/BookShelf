import React from "react";
import styles from "./Fab.module.css";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
const Fab = (props) => {
  console.log(props.menuVisible);
  return (
    <div
      className={`${styles.container} ${
        props.menuVisible ? styles.active : ""
      }`}
    >
      <span className={`${styles.iconContainer} `} onClick={props.onClick}>
        <PlusCircleIcon
          className={`${styles.icon} ${
            props.menuVisible ? styles.decreasedicon : ""
          }`}
        />
      </span>
      {props.menuVisible && (
        <div className={styles.menudiv}>
          <h6 className={`${styles.menutitle} ${props.menutitleStyle}`}>
            {props.menutitle ? props.menutitle : "Move To..."}
          </h6>
          {props.menuItems &&
            props.menuItems.map((item) => {
              return (
                <h5
                  key={item}
                  className={`${styles.menuItems} ${props.menuItemStyle}`}
                  onClick={() => {
                    if (props.selectedTab) {
                      props.menuActions(
                        item,
                        props.bookData,
                        props.selectedTab
                      );
                      return;
                    }
                    props.menuActions(item, props.bookData);
                  }}
                >
                  {item}
                </h5>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Fab;
