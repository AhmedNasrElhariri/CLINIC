import gql from 'graphql-tag';

export const ADD_FACE_OPERATION = gql`
  mutation addFaceOperation($faceOperation: FaceOperationInput!) {
    addFaceOperation(faceOperation: $faceOperation) {
      id
    }
  }
`;

export const LIST_FACE_PARTATION_OPERATIONS = gql`
  query ($patientId: ID!, $facePartationNumber: Int!) {
    myFacePartationOperations(
      patientId: $patientId
      facePartationNumber: $facePartationNumber
    ) {
      id
      date
      units
      material {
        id
        name
      }
      facePartation {
        id
        number
        name
      }
    }
  }
`;

export const LIST_FACE_OPERATIONS = gql`
  query ($patientId: ID!) {
    myFaceOperations(patientId: $patientId) {
      id
      date
      units
      material {
        id
        name
      }
      facePartation {
        id
        number
        name
      }
    }
  }
`;

export const DELETE_FACE_OPERATION = gql`
  mutation deleteFaceOperation($id: ID!) {
    deleteFaceOperation(id: $id) {
      id
    }
  }
`;
