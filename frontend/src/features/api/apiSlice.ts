import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { RootState } from "redux-store/store";

export const apiSlice = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: `${process.env.REACT_APP_API_ENDPOINT ?? ""}/graphql`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
