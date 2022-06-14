import gql from "graphql-tag";

export const LIST_SEARCHED_PATIENTS = gql`
  query ($name: String, $organizationId: ID) {
    searchedPatients(name: $name, organizationId: $organizationId) {
      id
      name
      phoneNo
      phoneNoTwo
      age
    }
  }
`;

export const LIST_SESSIONS_DEFINITION = gql`
  query ($organizationId: ID) {
    mySessionsDefinition(organizationId: $organizationId) {
      id
      name
      price
      duration
    }
  }
`;

export const APPOINTMENTS_DAY_COUNT = gql`
  query appointmentsDayCount($date: Date!, $userId: ID) {
    appointmentsDayCount(date: $date, userId: $userId) {
      appointments {
        id
        date
        duration
      }
      totalAppointment
      totalWaiting
    }
  }
`;

export const LIST_BRANCHES_TREE_BY_ORGANIZATIONID = gql`
  query listBranchesTreeByOrganizationId($organizationId: ID!) {
    listBranchesTreeByOrganizationId(organizationId: $organizationId) {
      id
      name
      specialties {
        id
        name
        doctors {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($appointment: AppointmentInput!) {
    createAppointment(appointment: $appointment) {
      id
      type
      date
      status
      patient {
        id
        name
        age
        sex
        phoneNo
      }
    }
  }
`;

export const VERIFY = gql`
  mutation verifyPatient($token: String) {
    verifyPatient(token: $token) {
      patientId
      organizationId
    }
  }
`;
