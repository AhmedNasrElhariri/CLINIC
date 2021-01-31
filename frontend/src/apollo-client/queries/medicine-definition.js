import gql from 'graphql-tag';

export const LIST_MEDICINES_DEFINITION = gql`
  {
    myMedicinesDefinition {
      id
      medicineName
      concentration
      medicineForm
    }
  }
`;

export const ADD_MEDICINE_DEFINITION = gql`
  mutation addMedicineDefinition($medicineDefinition: MedicineInputDefinition!) {
    addMedicineDefinition(medicineDefinition: $medicineDefinition) {
      id
      medicineName
      concentration
      medicineForm
    }
  }
`;

export const EDIT_MEDICINE_DEFINITION = gql`
  mutation editMedicineDefinition($medicineDefinition: MedicineInputDefinition!) {
    editMedicineDefinition(medicineDefinition: $medicineDefinition) {
      id
      medicineName
      concentration
      medicineForm
    }
  }
`;
