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
      archived
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
      vitalData
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
      archived
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
        archived
      }
    }
  }
`;

export const ACTIVE_VIEW = gql`
  query activeView {
    activeView {
      id
      name
      fieldGroups {
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
  }
`;

export const EDIT_VIEW = gql`
  mutation editView($groups: [GroupInput!]) {
    editView(groups: $groups)
  }
`;

export const CREATE_VIEW = gql`
  mutation createView($view: ViewInput!) {
    createView(view: $view)
  }
`;

export const LIST_MY_VIEWS_SUMMARY = gql`
  {
    listMyViews {
      id
      name
    }
  }
`;
export const LIST_MY_VIEWS_STATUS = gql`
  {
    listMyViewsStatus {
      id
      activeViewId
      defaultViewId
    }
  }
`;

export const CREATE_DEFAULT_VIEW = gql`
  mutation createDefaultView {
    createDefaultView
  }
`;

export const ACTIVATE_VIEW = gql`
  mutation activateView($viewId: ID!) {
    activateView(viewId: $viewId) {
      id
      activeViewId
    }
  }
`;
