import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  token: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLoginAction: (state, action) => {
      state.value = true;
      state.token = action.payload;
    },
    setLogoutAction: (state) => {
      state.value = false;
      state.token = "";
    },
  },
});

export const { setLoginAction, setLogoutAction } = authenticationSlice.actions;

export default authenticationSlice.reducer;
