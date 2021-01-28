import gql from 'graphql-tag';

export const LIST_TESTS = gql`
  {
    myTests {
      id
      testName
    }
  }
`;

export const ADD_TEST = gql`
  mutation addTest($test: TestInput!) {
    addTest(test: $test) {
      id
      testName
    }
  }
`;

export const EDIT_TEST = gql`
  mutation editTest($test: TestInput!) {
    editTest(test: $test) {
      id
      testName
    }
  }
`;
