import gql from 'graphql-tag';

export const LIST_COURSE_TYPES_DEFINITION = gql`
  {
    myCourseTypesDefinition {
      id
      name
      price
    }
  }
`;

export const ADD_COURSE_TYPE_DEFINITION = gql`
  mutation addCourseTypeDefinition(
    $courseTypeDefinition: CourseTypeInputDefinition!
  ) {
    addCourseTypeDefinition(courseTypeDefinition: $courseTypeDefinition) {
      id
      name
      price
    }
  }
`;

export const EDIT_COURSE_TYPE_DEFINITION = gql`
  mutation editCourseTypeDefinition(
    $courseTypeDefinition: CourseTypeInputDefinition!
  ) {
    editCourseTypeDefinition(courseTypeDefinition: $courseTypeDefinition) {
      id
      name
      price
    }
  }
`;
