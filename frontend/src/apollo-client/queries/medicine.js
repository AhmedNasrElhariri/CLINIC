import gql from 'graphql-tag';

export const LIST_MEDICINES_DEFINITION = gql`
  {
    myMedicinesDefinition {
      id
      name
      concentration
      form
      level
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
      user {
        id
        name
      }
      doctor {
        id
        name
      }
    }
  }
`;

export const ADD_MEDICINE_DEFINITION = gql`
  mutation addMedicineDefinition(
    $medicineDefinition: MedicineInputDefinition!
  ) {
    addMedicineDefinition(medicineDefinition: $medicineDefinition) {
      id
      name
      concentration
      form
    }
  }
`;

export const EDIT_MEDICINE_DEFINITION = gql`
  mutation editMedicineDefinition(
    $medicineDefinition: MedicineInputDefinition!
    $type: String!
  ) {
    editMedicineDefinition(
      medicineDefinition: $medicineDefinition
      type: $type
    ) {
      id
      name
      concentration
      form
    }
  }
`;
