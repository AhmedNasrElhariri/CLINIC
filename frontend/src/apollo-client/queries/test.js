import gql from 'graphql-tag';

export const LIST_TESTS_DEFINITION = gql`
  query ($categoryId: ID) {
    myLabsDefinitions(categoryId: $categoryId) {
      id
      name
      category{
        id
        name
      }
    }
  }
`;

export const ADD_TEST_DEFINITION = gql`
  mutation addLabDefinition($labDefinition: LabInputDefinition!) {
    addLabDefinition(labDefinition: $labDefinition) {
      id
      name
    }
  }
`;

export const EDIT_TEST_DEFINITION = gql`
  mutation editLabDefinition($labDefinition: LabInputDefinition!) {
    addLabDefinition(labDefinition: $labDefinition) {
      id
      name
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
