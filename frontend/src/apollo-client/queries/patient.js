import gql from 'graphql-tag';

export const CREATE_PATIENT = gql`
  mutation createPatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      name
      type
      phoneNo
    }
  }
`;

export const EDIT_PATIENT = gql`
  mutation editPatient($patient: PatientInput!) {
    editPatient(patient: $patient) {
      id
      name
      type
      phoneNo
      sex
      age
    }
  }
`;

export const LIST_PATIENTS = gql`
  {
    patients {
      id
      name
      type
      phoneNo
      sex
      age
    }
  }
`;

export const GET_PATIENT = gql`
  query($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      sex
      phoneNo
    }
  }
`;

export const ADD_LAB_DOCS = gql`
  mutation addLabDocs($documentLab: DocumentLabInput!) {
    addLabDocs(documentLab: $documentLab) {
      id
    }
  }
`;

export const GET_PATIENT_LABDOC = gql`
  query($status: String!, $patientId: String!) {
    patientLabDocs(status: $status, patientId: $patientId) {
      id
      requiredDate
      labDefinition {
        name
      }
    }
  }
`;

export const GET_PATIENT_LABS_HISTORY = gql`
  query($status: String!, $patientId: String!) {
    patientImageDocs(status: $status, patientId: $patientId) {
      id
      resultDate
      value
      fileId
      labDefinition {
        name
      }
    }
  }
`;

export const GET_PATIENT_IMAGES_HISTORY = gql`
  query($status: String!, $patientId: String!) {
    patientImageDocs(status: $status, patientId: $patientId) {
      id
      resultDate
      value
      fileId
      imageDefinition {
        name
      }
    }
  }
`;

export const GET_PATIENT_IMAGEDOC = gql`
  query($status: String!, $patientId: String!) {
    patientImageDocs(status: $status, patientId: $patientId) {
      id
      requiredDate
      imageDefinition {
        name
      }
    }
  }
`;

export const LIST_PATIENT_LABS = gql`
  query patientLabs($patientId: ID!) {
    patientLabs(patientId: $patientId) {
      id
      name
      documents {
        id
        file {
          id
          url
        }
      }
    }
  }
`;

export const CREATE_MEDICINE_HISTORY = gql`
  mutation createMedicineHistory($medicineHistory: MedicineHistoryInput!) {
    createMedicineHistory(medicineHistory: $medicineHistory) {
      id
      medicineName
      frequency
      dose
    }
  }
`;

export const CREATE_FAMILY_HISTORY = gql`
  mutation createFamilyHistory($familyHistory: FamilyHistoryInput!) {
    createFamilyHistory(familyHistory: $familyHistory) {
      id
      disease
      relative
    }
  }
`;

export const LIST_MEDICINE_HISTORY = gql`
  query medicineHistory($patientId: ID!) {
    medicineHistory(patientId: $patientId) {
      id
      medicineName
      frequency
      dose
      fromDate
    }
  }
`;

export const LIST_FAMILY_HISTORY = gql`
  query familyHistory($patientId: ID!) {
    familyHistory(patientId: $patientId) {
      id
      disease
      relative
    }
  }
`;
