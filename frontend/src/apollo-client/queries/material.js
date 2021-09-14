import gql from 'graphql-tag';

export const LIST_MATERIALS_DEFINITION = gql`
  {
    myMaterialsDefinition {
      id
      name
    }
  }
`;

export const ADD_MATERIAL_DEFINITION = gql`
  mutation addMaterialDefinition($materialDefinition: MaterialInputDefinition!) {
    addMaterialDefinition(materialDefinition: $materialDefinition) {
      id
      name
    }
  }
`;

export const EDIT_MATERIAL_DEFINITION = gql`
  mutation editMaterialDefinition($materialDefinition: MaterialInputDefinition!) {
    editMaterialDefinition(materialDefinition: $materialDefinition) {
      id
      name
    }
  }
`;
