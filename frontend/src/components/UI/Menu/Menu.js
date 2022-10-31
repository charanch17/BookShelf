import React from "react";
import Card from "../Card/Card";
import styles from "./Menu.module.css";
const Menu = (props) => {
  return (
    <span className={styles["pseudo-placeholder"]}>
      <Card className={`${styles.menu} ${props.menuStyle}`}>
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
                  props.menuActions(item, props.bookData);
                }}
              >
                {item}
              </h5>
            );
          })}
      </Card>
    </span>
  );
};
export default Menu;
