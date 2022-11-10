import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
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
`;
