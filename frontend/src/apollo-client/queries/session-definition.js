import gql from 'graphql-tag';

export const LIST_SESSIONS_DEFINITION = gql`
  {
    mySessionsDefinition {
      id
      name
    }
  }
`;

export const ADD_SESSION_DEFINITION = gql`
  mutation addSessionDefinition($sessionDefinition: SessionInputDefinition!) {
    addSessionDefinition(sessionDefinition: $sessionDefinition) {
      id
      name
    }
  }
`;

export const EDIT_SESSION_DEFINITION = gql`
  mutation editSessionDefinition($sessionDefinition: SessionInputDefinition!) {
    editSessionDefinition(sessionDefinition: $sessionDefinition) {
      id
      name
    }
  }
`;
