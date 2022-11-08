import { apiSlice } from "features/api/apiSlice";
import { LoginPayload, LoginResponse } from "./interfaces";
import { gql } from "graphql-request";

const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: ({ email, password }) => ({
        document: gql`
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                id
                avatar
                position
                organizationId
                language
                allowedViews
                name
                role {
                  permissions {
                    subject
                    action
                    level
                  }
                }
              }
            }
          }
        `,
        variables: { email, password },
      }),
      transformResponse: (response: { login: LoginResponse }) => response.login,
    }),
  }),
});

export const { useLoginMutation } = authAPI;
