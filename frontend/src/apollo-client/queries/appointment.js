import gql from 'graphql-tag';

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

export const LIST_APPOINTMENTS = gql`
  query (
    $input: AppointmentQueryInput
    $offset: Int
    $limit: Int
    $patient: String
    $type: AppointmentType
    $status: AppointmentStatus
    $dateFrom: Date
    $dateTo: Date
  ) {
    appointments(
      input: $input
      offset: $offset
      limit: $limit
      patient: $patient
      type: $type
      dateFrom: $dateFrom
      dateTo: $dateTo
      status: $status
    ) {
      appointments {
        id
        type
        date
        status
        date
        businessNotes
        accounted
        duration
        patient {
          id
          name
          age
          sex
          phoneNo
          points
        }
        user {
          id
          name
        }
        doctor {
          id
          name
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
        session {
          id
          name
        }
      }
      appointmentsCount
    }
  }
`;

export const LIST_TODAY_APPOINTMENTS = gql`
  {
    todayAppointments {
      id
      type
      date
      status
      date
      accounted
      duration
      businessNotes
      updatedAt
      patient {
        id
        name
        age
        sex
        phoneNo
        points
      }
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
      session {
        id
        name
      }
      doctor {
        id
        name
      }
    }
  }
`;

export const LIST_ALL_APPOINTMENTS = gql`
  {
    allAppointments {
      id
      type
      date
      status
      date
      accounted
      duration
      businessNotes
      updatedAt
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

export const LIST_PATIENT_APPOINTMENTS = gql`
  query ($patientId: ID!, $status: AppointmentStatus!) {
    patientAppointments(patientId: $patientId, status: $status) {
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
      prescription {
        medicineId
        dose
        timingId
        duration
        period
      }
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query ($id: ID!) {
    appointment(id: $id) {
      id
      type
      date
      status
      notes
      pulses
      powerOne
      powerTwo
      dynamicTextInput
      sessionsPulses {
        name
        value
      }
      prescription {
        medicineId
        dose
        timingId
        duration
        period
      }
      userId
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
      pictures {
        id
        comment
        url
      }
      labs {
        labDefinition {
          id
        }
      }
      images {
        imageDefinition {
          id
        }
      }
      branch {
        id
      }
      specialty {
        id
      }
    }
  }
`;

export const GET_SURGRIES_APPOINTMENT = gql`
  query ($id: ID!) {
    surgriesAppointments(id: $id) {
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
      pictures {
        id
        comment
        url
      }
    }
  }
`;

export const ADJUST_APPOINTMENT = gql`
  mutation adjustAppointment(
    $id: ID!
    $date: Date!
    $branchId: ID
    $specialtyId: ID
    $userId: ID
  ) {
    adjustAppointment(
      id: $id
      date: $date
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
    ) {
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

export const COMPLETE_APPOINTMENT = gql`
  mutation completeAppointment($id: ID!) {
    completeAppointment(id: $id) {
      id
      status
    }
  }
`;

export const ARCHIVE_APPOINTMENT = gql`
  mutation archiveAppointment(
    $id: ID!
    $sessions: [SessionInput!]
    $items: [FinishAppointmentItemInput!]
    $discount: Discount
    $date: Date!
    $others: Others
    $bank: ID
    $patientName: String!
    $patientId: ID!
    $company: ID
    $option: optionInput!
    $branchId: ID
    $specialtyId: ID
    $userId: ID
    $coupons: [couponInput]
    $couponsValue: Int
  ) {
    archiveAppointment(
      id: $id
      sessions: $sessions
      items: $items
      discount: $discount
      patientName: $patientName
      patientId: $patientId
      others: $others
      date: $date
      bank: $bank
      company: $company
      option: $option
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
      coupons: $coupons
      couponsValue: $couponsValue
    ) {
      id
      status
    }
  }
`;
export const UPDATE_BUSINESS_NOTES = gql`
  mutation updateNotes($id: ID!, $notes: String!) {
    updateNotes(id: $id, notes: $notes) {
      id
    }
  }
`;

export const GET_APPOINTMENT_HISTORY = gql`
  query ($appointmentId: ID, $patientId: ID) {
    appointmentHistory(appointmentId: $appointmentId, patientId: $patientId) {
      id
      type
      date
      status
      notes
      dynamicTextInput
      prescription {
        medicineId
        dose
        timingId
        duration
        period
      }
      data {
        id
        value
        field {
          id
          name
          type
          choices
        }
      }
      patient {
        id
        name
        age
        sex
      }
      pictures {
        id
        comment
        url
      }
      labs {
        id
      }
      images {
        id
      }
      sessionsPulses {
        name
        value
      }
      powerOne
      powerTwo
    }
  }
`;
