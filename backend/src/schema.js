
const AppointmentBaseInput = `

`

export default `
  scalar Date

  enum PatientMembershipType {
    Primary
    Secondary
  }

  enum AppointmentType {
    Examination
    Followup
  }

  enum Sex {
    Female
    Male
  }

  ########################### Query ##################################

  type Query {
    hello(name: String): String!
    patients: [Patient!]
    appointments(input: AppointmentQueryInput): [Appointment!]
    appointment(input: ID!): Appointment
  }

  ########################### Mutation ##################################

  type Mutation {
    createPatient(input: PatientInput!): Patient!
    createAppointment(input: AppointmentInput!): Appointment!
    updateAppointment(appointment: AppointmentInput!): Appointment!
  }

  ########################### Patient ##################################

  type Patient {
    id: ID!
    type: PatientMembershipType!
    name: String!
    phoneNo: String!
    age: Int!
    sex: Sex!
  }

  input PatientInput {
    name: String!
    phoneNo: String!
    age: Int!
  }

  ########################### Appointment ##################################

  type Appointment {
    id: ID!
    date: Date
    type: AppointmentType!
    patient: Patient!
    vitalData: VitalData
  }

  input AppointmentInput {
    patient: ID
    date: Date
    type: AppointmentType
    
    vitalData: VitalDataInput
    labs: [String!]
    complain: String
    signs: String
    diagnosis: String
    treatment: String
    recommendations: String
  }

  input AppointmentQueryInput {
    ids: [ID]
    patients: [ID]
    date: Date
    type: AppointmentType
  }

  ########################### Vital Data ##################################

  type VitalData {
    id: ID!
    weight: Float
    height: Float
    pulse: Float
    temp: Float
    glucoseLevel: Float
  }

  input VitalDataInput {
    weight: Float
    height: Float
    pulse: Float
    # temp: Float
    # glucoseLevel: Float
  }

  # input AppointmentInput {
  #   patient: ID!
  #   date: Date!
  #   type: AppointmentType!
  # }

  # input AppointmentQueryInput {
  #   ids: [ID]
  #   patients: [ID]
  #   date: Date
  #   type: AppointmentType
  # }
  `;
