import gql from 'graphql-tag';

export const LIST_PATIENT_REPORTS = gql`
  {
    myPatientReports {
      id
      name
      body
      context
    }
  }
`;

export const ADD_PATIENT_REPORT = gql`
  mutation addPatientReport($patientReport: PatientReportInput!) {
    addPatientReport(patientReport: $patientReport) {
      id
      name
      body
      context
    }
  }
`;

export const EDIT_PATIENT_REPORT = gql`
  mutation editPatientReport(
    $patientReport: PatientReportInput!
    $type: String!
  ) {
    editPatientReport(patientReport: $patientReport, type: $type) {
      id
      name
      body
      context
    }
  }
`;
