import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const VERIFY = gql`
  mutation verify($token: String) {
    verify(token: $token) {
      id
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation createPatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      name
      type
    }
  }
`;

export const LIST_PATIENTS = gql`
  {
    patients {
      id
      name
      type
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
      id
    }
  }
`;

export const LIST_APPOINTMENTS = gql`
  query($input: AppointmentQueryInput) {
    appointments(input: $input) {
      id
      type
      date
      patient {
        id
        name
        age
        sex
      }
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query($id: ID!) {
    appointment(id: $id) {
      id
      type
      date
      labs
      complain
      signs
      diagnosis
      treatment
      recommendations
      archived
      patient {
        id
        name
        age
        sex
      }
      vitalData
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment($id: ID!, $appointment: UpdateAppointmentInput!) {
    updateAppointment(id: $id, appointment: $appointment) {
      id
    }
  }
`;

export const ARCHIVE_APPOINTMENT = gql`
  mutation archiveAppointment($id: ID!) {
    archiveAppointment(id: $id) {
      id
    }
  }
`;

export const GET_APPOINTMENT_HISTORY = gql`
  query($id: ID!) {
    appointmentHistory(id: $id) {
      id
      type
      date
      labs
      complain
      signs
      diagnosis
      treatment
      recommendations
      archived
      patient {
        id
        name
        age
        sex
      }
      vitalData
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
      appointments {
        id
        labs
        complain
        signs
        diagnosis
        treatment
        recommendations
        archived
        vitalData
      }
    }
  }
`;

export const LIST_VIEW = gql`
  query listView {
    listView {
      id
      name
      order
      fields {
        id
        name
        order
        type
        required
      }
    }
  }
`;

export const EDIT_VIEW = gql`
  mutation editView($groups: [GroupInput!]) {
    editView(groups: $groups)
  }
`;
