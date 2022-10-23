import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./store/features/Auth/firebase";
import { authActions } from "./store/features/Auth/authSlice";
import { Routes,Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  // return <Login></Login>
  useEffect(() => {
    console.log("why")
    const clean = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authActions.addCurrentUser({
            email: user.email,
            uid: user.uid,
            phonenumber: user.phoneNumber,
          })
        );
      }
    });
    return clean()
  }, []);
  return <Routes>
   <Route path="/">
        <Route element={<PrivateRoutes/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>}/>
      </Route>
  </Routes>;
}

export default App;
