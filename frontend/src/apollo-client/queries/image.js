import gql from 'graphql-tag';

export const LIST_IMAGES_DEFINITION = gql`
  {
    myImagesDefinition {
      id
      name
      category
    }
  }
`;

export const ADD_IMAGE_DEFINITION = gql`
  mutation addImageDefinition($imageDefinition: ImageInputDefinition!) {
    addImageDefinition(imageDefinition: $imageDefinition) {
      id
      name
      category
    }
  }
`;

export const EDIT_IMAGE_DEFINITION = gql`
  mutation editImageDefinition($imageDefinition: ImageInputDefinition!) {
    editImageDefinition(imageDefinition: $imageDefinition) {
      id
      name
      category
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
  mutation editImageCategory($imageCategory: ImageInputCategory!) {
    editImageCategory(imageCategory: $imageCategory) {
      id
      name
    }
  }
`;