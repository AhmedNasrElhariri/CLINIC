import gql from 'graphql-tag';

export const LIST_SURGERIES = gql`
  {
    mySurgeries {
      id
      name
    }
  }
`;

export const DEFINE_SURGERY = gql`
  mutation defineSurgery($surgery: SurgeryInput!) {
    defineSurgery(surgery: $surgery) {
      name
    }
  }
`;

export const LIST_PATIENT_SURGERIES = gql`
  {
    myPatientSurgeries {
      id
      date
      patient {
        id
        name
      }
      surgery {
        id
        name
      }
      hospital {
        id
        name
      }
    }
  }
`;

export const CREATE_PATIENT_SURGERY = gql`
  mutation createPatientSurgery($patientSurgery: PatientSurgeryInput!) {
    createPatientSurgery(patientSurgery: $patientSurgery) {
      id
    }
  }
`;
