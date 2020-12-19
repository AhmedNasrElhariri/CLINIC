import gql from 'graphql-tag';

export const LIST_SURGERIES = gql`
  {
    mySurgeries {
      id
      name
    }
  }
`;

export const DEFINE_SURGERY = gql`
  mutation defineSurgery($surgery: SurgeryInput!) {
    defineSurgery(surgery: $hospital) {
      name
    }
  }
`;

export const CREATE_SURGERY = gql`
  mutation createSurgery($input: PatientSurgeryInput!) {
    createSurgery(input: $input) {
      id
    }
  }
`;
