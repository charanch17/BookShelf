import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import profile from "../../Assets/Images/DefaultAvatar.png";
import {
  ShoppingBagIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from "@heroicons/react/20/solid";
import { useLocation, Link, Navigate } from "react-router-dom";
const Navbar = (props) => {
  const currentUserData = useSelector((state) => {
    return state.auth.currentUser;
  });

  return (
    <div className={styles.navbar}>
      {useLocation().pathname === "/explore" && (
        <Link to="/" replace={true}>
          <ArrowLeftIcon className={styles.back} />
        </Link>
      )}
      <h1 className={styles.title}>
        {useLocation().pathname === "/explore" ? "Explore Books" : "Book Shelf"}
      </h1>
      <ul className={styles.navigators}>
        {useLocation().pathname === "/" && (
          <li className={styles.navigatorlink}>
            <Link to="/explore">
              <div className={styles.goto}>
                <ShoppingBagIcon className={styles.icon} />
                <h3 className={styles.navigatorlinktext}>Market</h3>
              </div>
            </Link>
          </li>
        )}
        {useLocation().pathname === "/explore" && (
          <li className={styles.navigatorlink}>
            <Link to="/">
              <div className={styles.goto}>
                <BookOpenIcon className={styles.icon} />
                <h3 className={styles.navigatorlinktext}>Shelf</h3>
              </div>
            </Link>
          </li>
        )}

        <li>
          {currentUserData.profileimage ? (
            <Avatar src={currentUserData.profileimage} />
          ) : (
            <Avatar
              src={profile}
              userName={
                currentUserData.userName
                  ? currentUserData.userName
                  : currentUserData.email.split("@")[0]
              }
            />
          )}
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
