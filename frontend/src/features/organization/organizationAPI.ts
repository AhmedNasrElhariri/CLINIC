import { Speciality } from "common/interfaces";
import { apiSlice } from "features/api/apiSlice";
import { GET_BRANCHES_QUERY } from "./queries";

const organizationAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query<any, void>({
      query: () => ({
        document: GET_BRANCHES_QUERY,
      }),
      transformResponse: (response: { listBranches: Array<Speciality> }) =>
        response.listBranches,
    }),
  }),
});

export const { useGetBranchesQuery } = organizationAPI;
