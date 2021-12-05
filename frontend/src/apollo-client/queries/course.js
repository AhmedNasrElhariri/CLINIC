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
  query ($patientId: ID!) {
    myCourses(patientId: $patientId) {
      id
      price
      paid
      discount
      consumed
      startDate
      endDate
      status
      sessions {
        id
        date
        status
      }
      courseDefinition {
        id
        name
        type
        price
        units
        messureOfUnits
      }
      doctor {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;
export const LIST_PATIENT_COURSES = gql`
  query ($patientId: ID!) {
    myCourses(patientId: $patientId) {
      id
      courseDefinition {
        name
      }
      price
      discount
      patient {
        id
        name
        age
        sex
        phoneNo
      }
      courseDefinition {
        id
        name
        type
        price
        units
        messureOfUnits
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
      user {
        id
        name
      }
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
      courseDefinition {
        id
        name
        type
        price
        units
        messureOfUnits
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
  ) {
    editCourse(
      courseId: $courseId
      paid: $paid
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
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
      courseDefinition {
        id
        name
        type
        price
        units
        messureOfUnits
      }
    }
  }
`;

export const EDIT_COURSE_UNITS = gql`
  mutation editCourseUnits($courseId: ID!, $consumed: Int!) {
    editCourseUnits(courseId: $courseId, consumed: $consumed) {
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
      courseDefinition {
        id
        name
        type
        price
        units
        messureOfUnits
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
  mutation deleteCourse($courseId: ID!, $refund: Int!) {
    deleteCourse(courseId: $courseId, refund: $refund) {
      id
      price
    }
  }
`;
