import gql from 'graphql-tag';

export const CREATE_PATIENT = gql`
  mutation createPatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      name
      type
      phoneNo
      sex
      age
      reference
      area
      code
      date
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
      reference
      area
    }
  }
`;

export const LIST_PATIENTS = gql`
  query ($offset: Int, $limit: Int, $name: String, $phoneNo: String) {
    patients(offset: $offset, limit: $limit, name: $name, phoneNo: $phoneNo) {
      patients {
        id
        name
        type
        phoneNo
        sex
        age
        reference
        area
        code
        date
      }
      patientsCount
    }
  }
`;

export const LIST_PATIENTS_REPORT = gql`
  query ($reference: String, $area: String) {
    patientsReport(area: $area, reference: $reference) {
      patientsAreaCount
      patientsReferenceCount
    }
  }
`;

export const LIST_SEARCHED_PATIENTS = gql`
  query ($name: String) {
    searchedPatients(name: $name) {
      id
      name
      phoneNo
      age
    }
  }
`;

export const LIST_PATIENTS_SUMMARY = gql`
  query ($offset: Int, $limit: Int) {
    patients(offset: $offset, limit: $limit) {
      patients {
        id
        name
      }
    }
  }
`;

export const GET_PATIENT = gql`
  query ($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      sex
      phoneNo
    }
  }
`;
export const PATIENT_COUPONS = gql`
  query ($patientId: ID!) {
    patientCoupons(patientId: $patientId) {
      id
      value
      remaining
      status
      date
    }
  }
`;

export const INSRET_LAB_RESULT = gql`
  mutation insertLabResult($lab: LabInput!) {
    insertLabResult(lab: $lab) {
      id
    }
  }
`;

export const INSRET_IMAGE_RESULT = gql`
  mutation insertImageResult($image: ImageInput!) {
    insertImageResult(image: $image) {
      id
      status
      value
    }
  }
`;

export const LIST_PATIENT_LABS = gql`
  query ($patientId: ID!) {
    patientLabs(patientId: $patientId) {
      id
      status
      value
      labDefinition {
        name
      }
      documents {
        id
        url
      }
    }
  }
`;

export const LIST_PATIENT_IMAGES = gql`
  query ($patientId: ID!) {
    patientImages(patientId: $patientId) {
      id
      status
      value
      imageDefinition {
        name
      }
      documents {
        id
        url
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

export const UPDATE_PATIENT_FIELD = gql`
  mutation updatePatientField($patientId: ID!, $data: [PatientFieldInput!]) {
    updatePatientField(patientId: $patientId, data: $data) {
      id
    }
  }
`;

export const GET_PATIENT_FIELD = gql`
  query getPatientField($patientId: ID!) {
    getPatientField(patientId: $patientId) {
      id
      value
      patient {
        id
      }
      field {
        id
      }
    }
  }
`;

export const GET_USER_PATIENT_FIELD = gql`
  {
    getUserPatientFields {
      id
      value
      patient {
        id
      }
      field {
        id
        name
      }
    }
  }
`;
