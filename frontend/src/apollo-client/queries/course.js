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
  mutation editCourseDefinition($courseDefinition: CourseInputDefinition!) {
    editCourseDefinition(courseDefinition: $courseDefinition) {
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
  query($patientId: ID!) {
    myCourses(patientId: $patientId) {
      id
      price
      paid
      discount
      appointments{
        id
        date
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
  mutation editCourse($courseId: ID!, $paid: Int!) {
    editCourse(courseId: $courseId, paid: $paid) {
      id
      price
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
