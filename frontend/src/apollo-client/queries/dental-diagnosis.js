import gql from 'graphql-tag';

export const LIST_DENTAL_DIAGNOSISS_DEFINITION = gql`
  {
    myDentalDiagnosissDefinition {
      id
      name
    }
  }
`;

export const ADD_DENTAL_DIAGNOSIS_DEFINITION = gql`
  mutation addDentalDiagnosisDefinition(
    $dentalDiagnosisDefinition: DentalDiagnosisInputDefinition!
  ) {
    addDentalDiagnosisDefinition(
      dentalDiagnosisDefinition: $dentalDiagnosisDefinition
    ) {
      id
      name
    }
  }
`;

export const EDIT_DENTAL_DIAGNOSIS_DEFINITION = gql`
  mutation editDentalDiagnosisDefinition(
    $dentalDiagnosisDefinition: DentalDiagnosisInputDefinition!
  ) {
    editDentalDiagnosisDefinition(
      dentalDiagnosisDefinition: $dentalDiagnosisDefinition
    ) {
      id
      name
    }
  }
`;

export const ADD_DENTAL_DIAGNOSIS = gql`
  mutation addToothDiagnosis($toothDiagnosis: ToothDiagnosisInput!) {
    addToothDiagnosis(toothDiagnosis: $toothDiagnosis) {
      id
    }
  }
`;

export const DELETE_DENTAL_DIAGNOSIS = gql`
  mutation deleteToothDiagnosis($id: ID!) {
    deleteToothDiagnosis(id: $id) {
      id
    }
  }
`;

export const LIST_TOOTH_TRANSACTIONS = gql`
  query ($toothNumber: Int!, $toothPartNumber: Int!, $patientId: ID!) {
    myToothTransactions(
      toothNumber: $toothNumber
      toothPartNumber: $toothPartNumber
      patientId: $patientId
    ) {
      id
      date
      depth
      tooth {
        toothNumber
        toothPartNumber
      }
      dentalDiagnosis {
        name
      }
      doctor {
        name
      }
    }
  }
`;

export const LIST_ALL_TOOTH_TRANSACTIONS = gql`
  query ( $patientId: ID!) {
    myAllToothTransactions(
      patientId: $patientId
    ) {
      id
      date
      depth
      tooth {
        toothNumber
        toothPartNumber
      }
      dentalDiagnosis {
        name
      }
      doctor {
        name
      }
    }
  }
`;

export const LIST_TOOTHS = gql`
  query ($patientId: ID!) {
    myTooths(patientId: $patientId) {
      id
      toothNumber
      toothPartNumber
    }
  }
`;

export const LIST_ORGANIZATION_DOCTORS = gql`
  {
    listOrganizationDoctors {
      id
      name
      position
    }
  }
`;
