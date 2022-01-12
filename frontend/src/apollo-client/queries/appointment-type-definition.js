import gql from 'graphql-tag';

export const LIST_APPOINTMENTTYPES_DEFINITION = gql`
  {
    myAppointmentTypesDefinition {
      id
      name
      urgent
    }
  }
`;

export const ADD_APPOINTMENTTYPE_DEFINITION = gql`
  mutation addAppointmentTypeDefinition(
    $appointmentTypeDefinition: AppointmentTypeInputDefinition!
  ) {
    addAppointmentTypeDefinition(
      appointmentTypeDefinition: $appointmentTypeDefinition
    ) {
      id
      name
      urgent
    }
  }
`;

export const EDIT_APPOINTMENTTYPE_DEFINITION = gql`
  mutation editAppointmentTypeDefinition(
    $appointmentTypeDefinition: AppointmentTypeInputDefinition!
    $type: String!
  ) {
    editAppointmentTypeDefinition(
      appointmentTypeDefinition: $appointmentTypeDefinition
      type: $type
    ) {
      id
      name
      urgent
    }
  }
`;

export const LIST_APPOINTMENTTYPES = gql`
  {
    myAppointmentTypesDefinition {
      id
      name
      urgent
    }
  }
`;
