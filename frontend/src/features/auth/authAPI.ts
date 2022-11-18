import { LoginPayload, LoginResponse } from "common/interfaces";
import { apiSlice } from "features/api/apiSlice";
import { LOGIN_MUTATION } from "./queries";

const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: ({ email, password }) => ({
        document: LOGIN_MUTATION,
        variables: { email, password },
      }),
      transformResponse: (response: { login: LoginResponse }) => response.login,
    }),
  }),
});

export const { useLoginMutation } = authAPI;
