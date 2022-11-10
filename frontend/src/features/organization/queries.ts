import { gql } from "graphql-request";

export const GET_BRANCHES_QUERY = gql`
  {
    listBranches {
      id
      name
      phoneNo
      specialties {
        id
        name
        doctors {
          id
          name
        }
      }
    }
  }
`;
