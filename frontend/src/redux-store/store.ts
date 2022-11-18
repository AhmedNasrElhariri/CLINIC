import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "features/api/apiSlice";
import { rtkQueryErrorHandler } from "middlewares/rtkQueryErrorHandler";
import authReducer from "features/auth/authSlice";
import rootReducer from "features/root/rootSlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorHandler),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
