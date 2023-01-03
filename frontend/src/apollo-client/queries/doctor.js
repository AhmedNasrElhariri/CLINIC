import gql from 'graphql-tag';

export const ADD_SESSION_TO_DOCTOR = gql`
  mutation addSessionToDoctor($doctorSession: DoctorSessionDefinationInput!) {
    addSessionToDoctor(doctorSession: $doctorSession) {
      id
    }
  }
`;
export const DELETE_SESSION_TO_DOCTOR = gql`
  mutation deleteSessionToDoctor($sessionId: ID!) {
    deleteSessionToDoctor(sessionId: $sessionId) {
      id
    }
  }
`;
export const LIST_DOCTOR_SESSION_DEFINATION = gql`
  query doctorSessionsDefinations($doctorId: ID!) {
    doctorSessionsDefinations(doctorId: $doctorId) {
      id
      feesCalculationMethod
      feesCalculationType
      fees
      session {
        name
      }
      doctor {
        name
      }
    }
  }
`;
export const LIST_DOCTOR_FEES = gql`
  query doctorFeesTransactions(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $doctorId: ID!
    $status: FeesStatus
  ) {
    doctorFeesTransactions(
      doctorId: $doctorId
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      status: $status
    ) {
      doctorFees {
        id
        name
        amount
        date
        doctor {
          name
        }
      }
      totalDoctorFees
      doctorFeesCount
    }
  }
`;

export const EDIT_DOCTOR_FEES = gql`
  mutation editDoctorFees($doctorFees: DoctorFeesTransactionInput!) {
    editDoctorFees(doctorFees: $doctorFees) {
      id
    }
  }
`;
