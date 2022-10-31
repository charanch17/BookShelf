import React, { useState } from "react";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import styles from "./Avatar.module.css";
import { UserCircleIcon } from "@heroicons/react/24/solid";
const Avatar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div>
        <div className={styles.container} onClick={toggleMenu}>
          <UserCircleIcon className={styles.profile} />

          {/* <img src={props.src} className={styles.profile} alt="profile" /> */}
          <h3 className={styles.username}>{props.userName}</h3>
        </div>
        {showMenu && <AvatarMenu toggleMenu={toggleMenu} showMenu={showMenu} />}
      </div>
    </>
  );
};
export default Avatar;
