import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation registerPatient($input: RegisterPatientInput!) {
    registerPatient(input: $input) {
      id
      name
      type
      phoneNo
    }
  }
`;

export const LOGIN = gql`
  mutation loginPatient($input: LoginPatientInput!) {
    loginPatient(input: $input) {
      token
      organizationId
    }
  }
`;

