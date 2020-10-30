import gql from 'graphql-tag';

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
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

export const LIST_APPOINTMENTS = gql`
  query($input: AppointmentQueryInput) {
    appointments(input: $input) {
      id
      type
      date
      status
      date
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

export const GET_APPOINTMENT = gql`
  query($id: ID!) {
    appointment(id: $id) {
      id
      type
      date
      status
      notes
      data {
        id
        value
        field {
          id
          name
        }
      }
      patient {
        id
        name
        age
        sex
        type
        phoneNo
      }
      collections {
        id
        caption
        images {
          id
          url
          comment
        }
      }
    }
  }
`;

export const ADJUST_APPOINTMENT = gql`
  mutation adjustAppointment($id: ID!, $date: Date!) {
    adjustAppointment(id: $id, date: $date) {
      id
      date
    }
  }
`;

export const CANCEL_APPOINTMENT = gql`
  mutation cancelAppointment($id: ID!) {
    cancelAppointment(id: $id) {
      id
      status
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment($appointment: UpdateAppointmentInput!) {
    updateAppointment(appointment: $appointment) {
      id
    }
  }
`;

export const SET_APPOINTMENT_DONE = gql`
  mutation setAppointmentDone(
    $id: ID!
    $sessions: [SessionInput!]
    $items: [FinishAppointmentItemInput!]
  ) {
    setAppointmentDone(id: $id, sessions: $sessions, items: $items) {
      id
      status
    }
  }
`;

export const ARCHIVE_APPOINTMENT = gql`
  mutation archiveAppointment($id: ID!) {
    archiveAppointment(id: $id) {
      id
      status
    }
  }
`;

export const GET_APPOINTMENT_HISTORY = gql`
  query($appointmentId: ID, $patientId: ID) {
    appointmentHistory(appointmentId: $appointmentId, patientId: $patientId) {
      id
      type
      date
      labs
      status
      notes
      data {
        id
        value
        field {
          id
          name
        }
      }
      patient {
        id
        name
        age
        sex
      }
      collections {
        id
        caption
        images {
          id
          url
          comment
        }
      }
    }
  }
`;
