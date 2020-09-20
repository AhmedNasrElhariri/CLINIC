import gql from 'graphql-tag';

export const MY_CLINICS = gql`
  query myClinics {
    myClinics {
      id
      name
      examinationPrice
      followupPrice
      urgentPrice
      duration
      appointmentsCount
      doctorName
      doctorTitle
      doctorJobDescription
      address
      phoneNo
      logo {
        id
        url
      }
    }
  }
`;

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
