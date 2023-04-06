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
    $type: ID
    $status: AppointmentStatus
    $dateFrom: Date
    $dateTo: Date
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
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
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
    ) {
      appointments {
        id
        type
        date
        status
        date
        businessNotes
        accounted
        confirmed
        duration
        reference
        isFollowUp
        canAddFollowUp
        patient {
          id
          name
          age
          sex
          code
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
          price
          duration
          followUp
          timer
        }
      }
      appointmentsCount
    }
  }
`;

export const LIST_TODAY_APPOINTMENTS = gql`
  query (
    $offset: Int
    $limit: Int
    $status: AppointmentStatus
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $patient: String
  ) {
    todayAppointments(
      offset: $offset
      limit: $limit
      status: $status
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      patient: $patient
    ) {
      appointments {
        id
        type
        date
        status
        date
        accounted
        confirmed
        duration
        businessNotes
        reference
        updatedAt
        isFollowUp
        canAddFollowUp
        referedDoctor
        patient {
          id
          name
          age
          sex
          code
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
          price
          duration
          followUp
          timer
        }
        doctor {
          id
          name
        }
      }
      appointmentsCount
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
      sessionsPulses {
        name
        value
      }
      prescription {
        medicineId
        dose
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
export const CONFIRMED_APPOINTMENT = gql`
  mutation confirmedAppointment($id: ID!) {
    confirmedAppointment(id: $id) {
      id
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

export const TRANSFER_APPOINTMENTS = gql`
  mutation transferAppointments($transferData: TransferInputDate!) {
    transferAppointments(transferData: $transferData)
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
    $remaining: Int
    $payOfRemaining: Int
    $bank: ID
    $patientName: String!
    $patientId: ID!
    $company: CompanyInput
    $option: optionInput!
    $branchId: ID
    $specialtyId: ID
    $userId: ID
    $coupons: [couponInput]
    $couponsValue: Int
    $doctorFees: doctorFeesInput
  ) {
    archiveAppointment(
      id: $id
      sessions: $sessions
      items: $items
      discount: $discount
      patientName: $patientName
      patientId: $patientId
      others: $others
      remaining: $remaining
      payOfRemaining: $payOfRemaining
      date: $date
      bank: $bank
      company: $company
      option: $option
      branchId: $branchId
      specialtyId: $specialtyId
      userId: $userId
      coupons: $coupons
      couponsValue: $couponsValue
      doctorFees: $doctorFees
    ) {
      id
      status
    }
  }
`;
export const ARCHIVE_REFERED_DOCTORAPPOINTMENT = gql`
  mutation archiveReferedDoctorAppointment($data: ReferedDoctorInput!) {
    archiveReferedDoctorAppointment(data: $data)
  }
`;
export const UPDATE_BUSINESS_NOTES = gql`
  mutation updateNotes($id: ID!, $notes: String!) {
    updateNotes(id: $id, notes: $notes) {
      id
      businessNotes
    }
  }
`;

export const DELETE_APPOINTMENT_PHOTO = gql`
  mutation deleteAppointmentPhoto($id: ID!) {
    deleteAppointmentPhoto(id: $id)
  }
`;

export const GET_APPOINTMENT_HISTORY = gql`
  query ($appointmentId: ID, $patientId: ID, $type: AppointmentType) {
    appointmentHistory(
      appointmentId: $appointmentId
      patientId: $patientId
      type: $type
    ) {
      id
      type
      date
      status
      notes
      prescription {
        medicineId
        dose
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
      doctor {
        id
        name
      }
      updater {
        id
        name
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
      patientSurgeries {
        surgery {
          name
        }
        hospital {
          name
        }
        date
      }
      powerOne
      powerTwo
    }
  }
`;
