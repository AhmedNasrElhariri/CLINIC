import gql from 'graphql-tag';

export const UPDATE_CLINIC = gql`
  mutation updateClinic($clinic: ClinicInput!) {
    updateClinic(clinic: $clinic) {
      id
    }
  }
`;

export const CLINIC_USERS = gql`
  query clinicUsers($clinicId: ID!) {
    clinicUsers(clinicId: $clinicId) {
      id
      name
      email
      permissions {
        subject
        action
      }
    }
  }
`;
