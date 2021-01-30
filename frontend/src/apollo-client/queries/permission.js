import gql from 'graphql-tag';

export const GET_ACTIONS = gql`
  {
    getActions {
      id
      name
      subject
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation createRole($role: RoleInput!) {
    createRole(role: $role)
  }
`;
