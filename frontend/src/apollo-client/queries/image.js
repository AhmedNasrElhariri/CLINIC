import gql from 'graphql-tag';

export const LIST_IMAGES_DEFINITION = gql`
  query ($categoryId: ID) {
    myImagesDefinition(categoryId: $categoryId) {
      id
      name
      category {
        id
        name
      }
    }
  }
`;

export const ADD_IMAGE_DEFINITION = gql`
  mutation addImageDefinition($imageDefinition: ImageInputDefinition!) {
    addImageDefinition(imageDefinition: $imageDefinition) {
      id
      name
    }
  }
`;

export const EDIT_IMAGE_DEFINITION = gql`
  mutation editImageDefinition(
    $imageDefinition: ImageInputDefinition!
    $type: String!
  ) {
    editImageDefinition(imageDefinition: $imageDefinition, type: $type) {
      id
      name
      category {
        id
        name
      }
    }
  }
`;

export const LIST_IMAGES_CATEGORY = gql`
  {
    myImagesCategory {
      id
      name
    }
  }
`;

export const ADD_IMAGE_CATEGORY = gql`
  mutation addImageCategory($imageCategory: ImageInputCategory!) {
    addImageCategory(imageCategory: $imageCategory) {
      id
      name
    }
  }
`;

export const EDIT_IMAGE_CATEGORY = gql`
  mutation editImageCategory(
    $imageCategory: ImageInputCategory!
    $type: String!
  ) {
    editImageCategory(imageCategory: $imageCategory, type: $type) {
      id
      name
    }
  }
`;
