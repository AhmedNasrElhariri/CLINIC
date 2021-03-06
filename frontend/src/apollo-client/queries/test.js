import gql from 'graphql-tag';

export const LIST_TESTS_DEFINITION = gql`
  {
    myTestsDefinition {
      id
      testName
      category
    }
  }
`;

export const ADD_TEST_DEFINITION = gql`
  mutation addTestDefinition($testDefinition: TestInputDefinition!) {
    addTestDefinition(testDefinition: $testDefinition) {
      id
      testName
      category
    }
  }
`;

export const EDIT_TEST_DEFINITION = gql`
  mutation editTestDefinition($testDefinition: TestInputDefinition!) {
    editTestDefinition(testDefinition: $testDefinition) {
      id
      testName
      category
    }
  }
`;
export const LIST_LABS_CATEGORY = gql`
  {
    myLabsCategory {
      id
      name
    }
  }
`;

export const ADD_LAB_CATEGORY = gql`
  mutation addLabCategory($labCategory: LabCategoryInput!) {
    addLabCategory(labCategory: $labCategory) {
      id
      name
    }
  }
`;

export const EDIT_LAB_CATEGORY = gql`
  mutation editLabCategory($labCategory: LabCategoryInput!) {
    editLabCategory(labCategory: $labCategory) {
      id
      name
    }
  }
`;
