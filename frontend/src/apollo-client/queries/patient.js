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

export const LIST_PATIENTS = gql`
  {
    patients {
      id
      name
      type
      phoneNo
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
  mutation addLabDocs($patientLab: PatientLabInput!) {
    addLabDocs(patientLab: $patientLab) {
      id
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

export const CREATE_MEDICAL_HISTORY = gql`
  mutation createMedicalHistory($medicalHistory: MedicalHistoryInput!) {
    createMedicalHistory(medicalHistory: $medicalHistory) {
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

export const LIST_MEDICAL_HISTORY = gql`
  query medicalHistory($patientId: ID!) {
    medicalHistory(patientId: $patientId) {
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
