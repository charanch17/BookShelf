import React from "react";
import styles from "./AvatarMenu.module.css";
import AvatarMenuItem from "./AvatarMenuItem";
import {
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/Auth/authReducers";
import { authActions } from "../../store/features/Auth/authSlice";
import { Navigate } from "react-router-dom";
import profile from "../../Assets/Images/DefaultAvatar.png";
import { AlertActions } from "../../store/features/Alerts/AlertSlice";

const AvatarMenu = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout()).then(() => {
      dispatch(authActions.resetCurrentUser());
      dispatch(
        AlertActions.setAlert({
          alertMessage: "Logged Out Successfully",
          type: "success",
        })
      );
    });
  };
  const currentUserData = useSelector((state) => {
    return state.auth.currentUser;
  });
  return (
    <div
      className={`${
        props.showMenu
          ? styles["user-menu-wrapper"]
          : styles["user-menu-wrapper-close"]
      }`}
    >
      <div
        className={`${
          props.showMenu ? styles["user-menu"] : styles["user-menu-close"]
        }`}
      >
        {!currentUserData.uid && <Navigate to="/login" replace={true} />}
        <XMarkIcon className={styles.icon} onClick={props.toggleMenu} />
        {currentUserData.uid &&
          (currentUserData.profileimage ? (
            <img
              src={currentUserData.profileimage}
              className={styles.profileimage}
              alt="profile"
            />
          ) : (
            <div className={styles.about}>
              <img
                src={profile}
                className={styles.profileimage}
                alt="profile"
              />
              <h5 className={styles.email}>{currentUserData.email}</h5>
            </div>
          ))}

        <AvatarMenuItem title="logout" onClick={logoutHandler}>
          <ArrowLeftOnRectangleIcon />
        </AvatarMenuItem>
      </div>
    </div>
  );
};

export default AvatarMenu;
