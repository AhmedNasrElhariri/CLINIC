import gql from "graphql-tag";

export const LIST_TESTS_DEFINITION = gql`
  {
    myTestsDefinition {
      id
      testName
    }
  }
`;

export const ADD_TEST_DEFINITION = gql`
  mutation addTestDefinition($testDefinition: TestInputDefinition!) {
    addTestDefinition(testDefinition: $testDefinition) {
      id
      testName
    }
  }
`;

export const EDIT_TEST_DEFINITION = gql`
  mutation editTestDefinition($testDefinition: TestInputDefinition!) {
    editTestDefinition(testDefinition: $testDefinition) {
      id
      testName
    }
  }
`;
