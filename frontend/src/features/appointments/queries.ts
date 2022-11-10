import { gql } from "graphql-request";

export const GET_APPOINTMENTS = gql`
  query (
    $input: AppointmentQueryInput
    $offset: Int
    $limit: Int
    $patient: String
    $type: ID
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
        reference
        subscriptionType
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
