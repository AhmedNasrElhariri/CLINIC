import gql from 'graphql-tag';

export const LIST_HOSPITALS = gql`
  {
    myHospitals {
      id
      name
      phoneNo
      address
      level
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
    }
  }
`;

export const ADD_HOSPITAL = gql`
  mutation addHospital($hospital: HospitalInput!) {
    addHospital(hospital: $hospital) {
      id
      name
      phoneNo
      address
      level
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
    }
  }
`;

export const EDIT_HOSPITAL = gql`
  mutation editHospital($hospital: HospitalInput!, $type: String!) {
    editHospital(hospital: $hospital, type: $type) {
      id
      name
      phoneNo
      address
      level
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
    }
  }
`;
