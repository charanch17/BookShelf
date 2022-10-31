import React, { useRef, useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  login,
  getLoggedInUser,
  ResetPassword as resetPassword,
} from "../../store/features/Auth/authReducers";
import { AlertActions } from "../../store/features/Alerts/AlertSlice";
import { authActions } from "../../store/features/Auth/authSlice";
import ProgressBar from "../UI/ProgressBar/ProgressBar";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [ResetPassword, setResetPassword] = useState(false);
  const [resetMailSent, setResetMailSent] = useState(false);
  const [formValidity, setFormvalidity] = useState({
    email: true,
    password: true,
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  var userID = useSelector((state) => {
    return state.auth.currentUser.uid;
  });
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const emailformat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValidity = emailformat.test(emailRef.current.value.trim());
    if (ResetPassword) {
      setFormvalidity({
        email: emailValidity,
        password: true,
      });
      if (emailValidity) {
        dispatch(authActions.setLoading());
        dispatch(resetPassword({ email: emailRef.current.value.trim() }))
          .then(() => {
            dispatch(
              AlertActions.setAlert({
                alertMessage: "Reset Link Sent To Email",
                type: "success",
              })
            );
            dispatch(authActions.setLoading());
            setResetMailSent(true);
          })
          .catch((e) => {
            dispatch(authActions.setLoading());
            dispatch(
              AlertActions.setAlert({
                alertMessage: "Unable to fetch account info to send mail",
              })
            );
          });
      }
    } else {
      var passwordValidity = passwordRef.current.value.trim().length > 7;
      setFormvalidity({
        email: emailValidity,
        password: passwordValidity,
      });
      if (emailValidity && passwordValidity) {
        dispatch(authActions.setLoading());
        dispatch(
          login({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          })
        )
          .then(() => {
            dispatch(getLoggedInUser());
            dispatch(
              AlertActions.setAlert({
                alertMessage: "Login Successful",
                type: "success",
              })
            );
          })
          .catch((e) => {
            dispatch(AlertActions.setAlert({ alertMessage: e.message }));
            dispatch(authActions.setLoading());
          });
        //   createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        //     .then((res) => {
        //       onAuthStateChanged(auth, (user) => {
        //         if (user) {
        //           dispatch(
        //             authActions.addCurrentUser({
        //               email: user.email,
        //               uid: user.uid,
        //               phonenumber: user.phoneNumber,
        //             })
        //           );
        //         }
        //       });
        //     })
        //     .catch((e) => {
        //       console.log(e.message);
        //     });
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        {userID && <Navigate to="/" replace={true} />}
        {!userID && loading && (
          <span className={styles.progressbar}>
            <ProgressBar />
          </span>
        )}

        <Card className={styles.card}>
          {/* <span>Invalid Credentials</span> */}
          <h1 className={styles.cardheader}>
            {!ResetPassword ? "Login" : "Reset Password"}
          </h1>
          <form onSubmit={formSubmitHandler} className={styles.form}>
            {!resetMailSent && (
              <div className={styles["user-input"]}>
                <input
                  id="email"
                  ref={emailRef}
                  placeholder=" "
                  autoComplete="off"
                  className={`${!formValidity.email ? styles.inputerror : ""} ${
                    styles.input
                  }`}
                />
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>

                {!formValidity.email && (
                  <span className={styles.error}>enter valid email !!</span>
                )}
              </div>
            )}
            {resetMailSent && (
              <span style={{ marginLeft: "1rem", color: "rgb(71, 181, 255)" }}>
                follow instructions in mail to reset password and Login Again
              </span>
            )}
            {!ResetPassword && (
              <div className={styles["user-input"]}>
                <input
                  id="password"
                  ref={passwordRef}
                  type="password"
                  placeholder=" "
                  autoComplete="off"
                  className={`${
                    !formValidity.password ? styles.inputerror : ""
                  } ${styles.input}`}
                />
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                {!formValidity.password && (
                  <span className={styles.error}>
                    password didnt match criteria!!
                  </span>
                )}
              </div>
            )}
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.login}
                disabled={loading || resetMailSent}
              >
                {!ResetPassword ? "Login" : "Send password Reset Link"}
              </button>
              <div className={styles.links}>
                <Link to="/signup">Signup</Link>
                <Link
                  onClick={() => {
                    setResetMailSent((prev) => {
                      return false;
                    });
                    setResetPassword((prev) => {
                      return !prev;
                    });
                  }}
                >
                  {ResetPassword ? "Login" : "Forgot password?"}
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};
export default Login;
