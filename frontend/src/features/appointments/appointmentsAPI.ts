import { apiSlice } from "features/api/apiSlice";
// import { LoginPayload, LoginResponse } from "./interfaces";
// import { gql } from "graphql-request";
import { GET_APPOINTMENTS } from "./queries";

const appointmentsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<any, void>({
      query: () => ({
        document: GET_APPOINTMENTS,
      }),
      //   transformResponse: (response: { login: LoginResponse }) => response.login,
    }),
  }),
});

export const { useGetAppointmentsQuery } = appointmentsAPI;
