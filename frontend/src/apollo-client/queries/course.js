import gql from 'graphql-tag';

export const LIST_COURSES_DEFINITION = gql`
  {
    myCoursesDefinition {
      id
      name
      type
      price
      units
      messureOfUnits
    }
  }
`;

export const ADD_COURSE_DEFINITION = gql`
  mutation addCourseDefinition($courseDefinition: CourseInputDefinition!) {
    addCourseDefinition(courseDefinition: $courseDefinition) {
      id
      name
      type
      price
      units
      messureOfUnits
    }
  }
`;

export const EDIT_COURSE_DEFINITION = gql`
  mutation editCourseDefinition(
    $courseDefinition: CourseInputDefinition!
    $type: String!
  ) {
    editCourseDefinition(courseDefinition: $courseDefinition, type: $type) {
      id
      name
      type
      price
      units
      messureOfUnits
    }
  }
`;

export const LIST_COURSES = gql`
  query (
    $patientId: ID
    $offset: Int
    $limit: Int
    $status: CourseStatus
    $courseId: ID
    $sortType: String
  ) {
    myCourses(
      patientId: $patientId
      offset: $offset
      limit: $limit
      status: $status
      courseId: $courseId
      sortType: $sortType
    ) {
      courses {
        id
        price
        name
        type
        units
        paid
        discount
        consumed
        startDate
        endDate
        status
        doctor {
          id
          name
        }
        user {
          id
          name
        }
        patient {
          name
          phoneNo
        }
        sessions {
          id
          type
          date
          status
        }
      }
      coursesCount
    }
  }
`;
export const LIST_PATIENT_COURSES = gql`
  query ($patientId: ID!) {
    myPatientCourses(patientId: $patientId) {
      id
      price
      name
      type
      units
      paid
      discount
      consumed
      startDate
      endDate
      status
      doctor {
        id
        name
      }
      user {
        id
        name
      }
      patient {
        name
        phoneNo
      }
      sessions {
        id
        type
        date
        status
      }
    }
  }
`;

export const LIST_COURSE_PAYMENTS = gql`
  query ($courseId: ID!) {
    coursePayments(courseId: $courseId) {
      id
      payment
      date
      type
      user {
        id
        name
      }
    }
  }
`;
export const TOTAL_UNPAID_OF_COURSES = gql`
  {
    totalUnpaidOfCourses {
      totalUnpaid
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse($course: CourseInput!) {
    addCourse(course: $course) {
      id
      price
      discount
      patient {
        id
        name
        age
        sex
        phoneNo
      }
    }
  }
`;

export const EDIT_COURSE = gql`
  mutation editCourse(
    $courseId: ID!
    $branchId: ID
    $specialtyId: ID
    $userId: ID
    $paid: Int!
    $visaPaid: Int
    $bank: ID
  ) {
    editCourse(
      courseId: $courseId
      paid: $paid
      visaPaid: $visaPaid
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
      bank: $bank
    ) {
      id
      price
      discount
      patient {
        id
        name
        age
        sex
        phoneNo
      }
    }
  }
`;

export const EDIT_COURSE_PAYMENT_HISTORY = gql`
  mutation editCoursePaymentHistory(
    $courseId: ID!
    $branchId: ID
    $specialtyId: ID
    $userId: ID
    $paid: Int!
    $bank: ID
    $paymentId: ID!
  ) {
    editCoursePaymentHistory(
      courseId: $courseId
      paid: $paid
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
      bank: $bank
      paymentId: $paymentId
    ) {
      id
      price
      discount
      patient {
        id
        name
        age
        sex
        phoneNo
      }
    }
  }
`;

export const EDIT_COURSE_UNITS = gql`
  mutation editCourseUnits($courseId: ID!, $consumed: Int!, $type: String!) {
    editCourseUnits(courseId: $courseId, consumed: $consumed, type: $type) {
      id
      price
      discount
      consumed
      patient {
        id
        name
        age
        sex
        phoneNo
      }
    }
  }
`;

export const EDIT_COURSE_DOCTOR = gql`
  mutation editCourseDoctor($courseId: ID!, $doctorId: ID!) {
    editCourseDoctor(courseId: $courseId, doctorId: $doctorId) {
      id
      price
    }
  }
`;

export const FINISH_COURSE = gql`
  mutation finishCourse($courseId: ID!) {
    finishCourse(courseId: $courseId) {
      id
      price
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse(
    $courseId: ID!
    $refund: Int!
    $bank: ID
    $branchId: ID
    $specialtyId: ID
    $userId: ID
  ) {
    deleteCourse(
      courseId: $courseId
      refund: $refund
      bank: $bank
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
    ) {
      id
      price
    }
  }
`;
