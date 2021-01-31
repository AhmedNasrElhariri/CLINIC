import gql from 'graphql-tag';

export const LIST_IMAGES_DEFINITION = gql`
  {
    myImagesDefinition {
      id
      imageName
    }
  }
`;

export const ADD_IMAGE_DEFINITION = gql`
  mutation addImageDefinition($imageDefinition: ImageInputDefinition!) {
    addImageDefinition(imageDefinition: $imageDefinition) {
      id
      imageName
    }
  }
`;

export const EDIT_IMAGE_DEFINITION = gql`
  mutation editImageDefinition($imageDefinition: ImageInputDefinition!) {
    editImageDefinition(imageDefinition: $imageDefinition) {
      id
      imageName
    }
  }
`;
