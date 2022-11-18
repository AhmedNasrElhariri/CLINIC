import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStore, LoginResponse } from "common/interfaces";
import { getToken } from "services/local-storage";

const initialState: AuthStore = {
  user: undefined,
  token: getToken(),
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
