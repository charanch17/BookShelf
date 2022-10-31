export const setAlert = (state, { payload }) => {
  state.alertMessage = payload.alertMessage;
  state.type = payload.type ? payload.type : "error";
  state.showAlertModal = true;
};

export const resetAlert = (state, { paylod }) => {
  state.alertMessage = "";
  state.type = "";
  state.showAlertModal = false;
};
