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
  query doctorSessionsDefinations($doctorId: ID!, $referedDoctor: Boolean) {
    doctorSessionsDefinations(
      doctorId: $doctorId
      referedDoctor: $referedDoctor
    ) {
      id
      feesCalculationMethod
      feesCalculationType
      fees
      referedDoctor
      sessionId
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
    $type: ReferedStatus
  ) {
    doctorFeesTransactions(
      doctorId: $doctorId
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      status: $status
      type: $type
    ) {
      doctorFees {
        id
        name
        amount
        totalPrice
        date
        cost
        unitPrice
        numberOfUnits
        doctor {
          name
        }
        session {
          price
        }
      }
      totalDoctorFees
      doctorFeesCount
      totalPrice
      totalCost
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
export const ADD_NEW_DOCTOR_FEES = gql`
  mutation addNewDoctorFees($doctorFees: DoctorFeesTransactionInput!) {
    addNewDoctorFees(doctorFees: $doctorFees) {
      id
    }
  }
`;
export const GATHER_DOCTOR_FEES = gql`
  mutation gatherDoctorFees($gatherDoctorFeesData: GatherDoctorFeesDataInput!) {
    gatherDoctorFees(gatherDoctorFeesData: $gatherDoctorFeesData)
  }
`;

//doctor Course part
export const LIST_DOCTOR_COURSE_PARTS_DEFINATION = gql`
  query doctorCoursePartsDefinations($doctorId: ID!) {
    doctorCoursePartsDefinations(doctorId: $doctorId) {
      id
      feesCalculationMethod
      feesCalculationType
      fees
      partId
      part {
        name
      }
      doctor {
        name
      }
    }
  }
`;
export const ADD_COURSE_PART_TO_DOCTOR = gql`
  mutation addCoursePartToDoctor(
    $doctorCoursePart: DoctorCoursePartDefinationInput!
  ) {
    addCoursePartToDoctor(doctorCoursePart: $doctorCoursePart) {
      id
    }
  }
`;
export const DELETE_COURSE_PART_TO_DOCTOR = gql`
  mutation deleteCoursePartToDoctor($partId: ID!) {
    deleteCoursePartToDoctor(partId: $partId) {
      id
    }
  }
`;
