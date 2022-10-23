import React, { useEffect, useRef, useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import {useSelector} from "react-redux";
import {Link,Navigate} from "react-router-dom";
import {useDispatch} from "react-redux"
import { login,getLoggedInUser } from "../../store/features/Auth/authReducers";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [formValidity,setFormvalidity] = useState({email:true,password:true})
  const dispatch = useDispatch();
  var userID = useSelector((state)=>{return state.auth.currentUser.uid})
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const emailformat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValidity = emailformat.test(emailRef.current.value.trim());
    var passwordValidity = passwordRef.current.value.trim().length > 7;
    setFormvalidity({
      email: emailValidity,
      password: passwordValidity
    });
    if (emailValidity && passwordValidity ) {
        dispatch(login({email:emailRef.current.value, password:passwordRef.current.value})).then(()=>{
            dispatch(getLoggedInUser());
        }
        )
        .catch((e)=>{console.log(e)})
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
        {userID && <Navigate to="/" replace={true}/>}
      <Card className={styles.card}>
      {/* <span>Invalid Credentials</span> */}
      <h1 className={styles.cardheader}>Login</h1>
        <form
          onSubmit={formSubmitHandler}
          className={styles.form}
        >
            
          <div className={styles["user-input"]}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input id="email" ref={emailRef} />
            {!formValidity.email && <span className={styles.error}>enter valid email !!</span>}
          </div>
          <div className={styles["user-input"]}>
            <label htmlFor="password" className={styles.label}>
              password
            </label>
            <input id="password" ref={passwordRef} type="password" />
            {!formValidity.password && <span className={styles.error}>password didnt match criteria!!</span>}

          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.login}>
              Login
            </button>
            <div className={styles.links}>
              <Link to="/signup">Signup</Link>
              <Link to="/signup">Forgot password?</Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Login;
