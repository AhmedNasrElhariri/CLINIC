import gql from 'graphql-tag';

export const LIST_SURGERIES = gql`
  {
    mySurgeries {
      id
      name
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

export const DEFINE_SURGERY = gql`
  mutation defineSurgery($surgery: SurgeryInput!) {
    defineSurgery(surgery: $surgery) {
      name
    }
  }
`;

export const EDIT_SURGERY = gql`
  mutation editSurgery($surgery: SurgeryInput!, $type: String!) {
    editSurgery(surgery: $surgery, type: $type) {
      id
      name
    }
  }
`;

export const LIST_PATIENT_SURGERIES = gql`
  query patientSurgeries(
    $patientId: ID
    $surgery: ID
    $hospital: ID
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
  ) {
    patientSurgeries(
      patientId: $patientId
      surgery: $surgery
      hospital: $hospital
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) {
      surgeries {
        id
        date
        fees
        hospitalFees
        anesthesia
        anesthesiaDoctorName
        assistantFees
        anesthesiaFees
        others
        patient {
          id
          name
        }
        surgeries {
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
      surgeriesCount
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

export const EDIT_PATIENT_SURGERY = gql`
  mutation editPatientSurgery($patientSurgery: PatientSurgeryInput!) {
    editPatientSurgery(patientSurgery: $patientSurgery) {
      id
    }
  }
`;
