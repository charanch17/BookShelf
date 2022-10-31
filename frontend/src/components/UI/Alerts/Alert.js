import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Alert.module.css";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { AlertActions } from "../../../store/features/Alerts/AlertSlice";

const Alert = () => {
  const state = useSelector((state) => {
    return state.alert;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.showAlertModal) {
      var id = setTimeout(() => {
        dispatch(AlertActions.resetAlert());
      }, 5000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [state.showAlertModal, dispatch]);
  return (
    <>
      {state.showAlertModal && (
        <div style={{ position: "relative" }}>
          <div
            className={`${state.showAlertModal ? styles.open : ""} ${
              styles[state.type]
            }`}
          >
            <ExclamationCircleIcon className={styles.icon} />
            <span className={styles.text}>{state.alertMessage}</span>
            <XMarkIcon
              className={styles.icon}
              onClick={() => {
                dispatch(AlertActions.resetAlert());
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Alert;
