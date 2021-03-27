import gql from 'graphql-tag';

export const LIST_COURSES_DEFINITION = gql`
  {
    myCoursesDefinition {
      id
      name
      type
      price
      units
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
    }
  }
`;
