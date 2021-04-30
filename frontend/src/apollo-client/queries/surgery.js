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

export const EDIT_SURGERY = gql`
  mutation editSurgery($surgery: SurgeryInput!) {
    editSurgery(surgery: $surgery) {
      id
      name
    }
  }
`;

export const LIST_PATIENT_SURGERIES = gql`
  query patientSurgeries($patientId: ID) {
    patientSurgeries(patientId: $patientId) {
      id
      date
      fees
      hospitalFees
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
      appointment {
        id
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
