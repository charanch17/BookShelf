import React, { useRef, useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./Signup.module.css";
import { useDispatch,useSelector } from "react-redux";
import {Link,Navigate} from "react-router-dom";
import { getLoggedInUser, signup } from "../../store/features/Auth/authReducers";

const Signup = () => {
  const passwordRef = useRef();
  const emailRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const userID = useSelector((state)=>state.auth.currentUser.uid)
  const [formValidity, setFormvalidity] = useState({
    email: true,
    password: true,
    confirmPassword: true,
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const emailformat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValidity = emailformat.test(emailRef.current.value.trim());
    var passwordValidity = passwordRef.current.value.trim().length > 7;
    var confirmPasswordValidity =
      confirmPasswordRef.current.value.trim() ===
      passwordRef.current.value.trim();
    setFormvalidity({
      email: emailValidity,
      password: passwordValidity,
      confirmPassword: confirmPasswordValidity,
    });
    if (emailValidity && passwordValidity && confirmPasswordValidity) {
        dispatch(signup({email:emailRef.current.value, password:passwordRef.current.value})).then(()=>{
            dispatch(getLoggedInUser())
        })
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
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        {userID && <Navigate to="/" replace={true}/>}
        <h1 className={styles.cardheader}>Sign Up</h1>
        <form onSubmit={formSubmitHandler} className={styles.form}>
          <div className={styles["user-input"]}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input id="email" ref={emailRef} />
            {!formValidity.email && (
              <span className={styles.error}>enter valid email !!</span>
            )}
          </div>
          <div className={styles["user-input"]}>
            <label htmlFor="password" className={styles.label}>
              password
            </label>
            <input id="password" ref={passwordRef} type="password" />
            {!formValidity.password && (
              <span className={styles.error}>
                password didnt match criteria!!
              </span>
            )}
          </div>
          <div className={styles["user-input"]}>
            <label htmlFor="confirmpassword" className={styles.label}>
              Re-enter password
            </label>
            <input
              id="confirmpassword"
              ref={confirmPasswordRef}
              type="password"
            />
            {!formValidity.confirmPassword && (
              <span className={styles.error}>
                re entered password should match password !!
              </span>
            )}
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.signup}>
              Signup
            </button>
            <div className={styles.links}>
              <label htmlFor="login" style={{ margin: "5px" }}>
                Already have account ?
              </label>
              <Link to="/login" id="login">
                {" "}
                Login
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Signup;
