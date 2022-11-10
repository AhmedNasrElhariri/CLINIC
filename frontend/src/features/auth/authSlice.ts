import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "common/utils/cookies";
import { Auth, LoginResponse } from "./interfaces";

const initialState: Auth = {
  user: undefined,
  token: getCookie("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      return { ...state, ...action.payload };
    },
  },
});

export default authSlice.reducer;

export const { setAuth } = authSlice.actions;
