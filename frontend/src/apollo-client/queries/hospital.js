import gql from 'graphql-tag';

export const LIST_HOSPITALS = gql`
  {
    myHospitals {
      id
      name
      phoneNo
      address
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
    }
  }
`;

export const EDIT_HOSPITAL = gql`
  mutation editHospital($hospital: HospitalInput!) {
    editHospital(hospital: $hospital) {
      id
      name
      type
      phoneNo
    }
  }
`;
