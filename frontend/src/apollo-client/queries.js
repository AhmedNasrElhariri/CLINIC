import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        permissions {
          action
          subject
        }
      }
    }
  }
`;

export const VERIFY = gql`
  mutation verify($token: String) {
    verify(token: $token) {
      id
      permissions {
        action
        subject
      }
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation createPatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      name
      type
      phoneNo
    }
  }
`;

export const LIST_PATIENTS = gql`
  {
    patients {
      id
      name
      type
      phoneNo
    }
  }
`;

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
      status
    }
  }
`;

export const SET_APPOINTMENT_DONE = gql`
  mutation setAppointmentDone($id: ID!) {
    setAppointmentDone(id: $id) {
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

// export const GET_APPOINTMENTS_HISTORY = gql`
//   query($id: ID!) {
//     appointmentHistory(id: $id) {
//       id
//       type
//       date
//       labs
//       status
//       data {
//         id
//         value
//         field {
//           id
//           name
//         }
//       }
//       patient {
//         id
//         name
//         age
//         sex
//       }
//     }
//   }
// `;

export const GET_PATIENT = gql`
  query($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      sex
      phoneNo
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

export const MY_CLINICS = gql`
  query myClinics {
    myClinics {
      id
      name
      examinationPrice
      followupPrice
      duration
      appointmentsCount
      doctorName
      doctorTitle
      doctorJobDescription
      address
      phoneNo
      logo {
        id
        url
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

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      url
    }
  }
`;

export const UPDATE_CLINIC = gql`
  mutation updateClinic($clinic: ClinicInput!) {
    updateClinic(clinic: $clinic) {
      id
    }
  }
`;

export const MY_SNIPPETS = gql`
  {
    mySnippets {
      id
      title
      body
    }
  }
`;

export const CREATE_SNIPPET = gql`
  mutation createSnippet($snippet: SnippetInput!) {
    createSnippet(snippet: $snippet) {
      id
      title
      body
    }
  }
`;

export const ADD_LAB_DOCS = gql`
  mutation addLabDocs($patientLab: PatientLabInput!) {
    addLabDocs(patientLab: $patientLab) {
      id
    }
  }
`;

export const LIST_PATIENT_LABS = gql`
  query patientLabs($patientId: ID!) {
    patientLabs(patientId: $patientId) {
      id
      name
      documents {
        id
        file {
          id
          url
        }
      }
    }
  }
`;

export const CREATE_MEDICAL_HISTORY = gql`
  mutation createMedicalHistory($medicalHistory: MedicalHistoryInput!) {
    createMedicalHistory(medicalHistory: $medicalHistory) {
      id
      medicineName
      frequency
      dose
    }
  }
`;

export const CREATE_FAMILY_HISTORY = gql`
  mutation createFamilyHistory($familyHistory: FamilyHistoryInput!) {
    createFamilyHistory(familyHistory: $familyHistory) {
      id
      disease
      relative
    }
  }
`;

export const LIST_MEDICAL_HISTORY = gql`
  query medicalHistory($patientId: ID!) {
    medicalHistory(patientId: $patientId) {
      id
      medicineName
      frequency
      dose
    }
  }
`;

export const LIST_FAMILY_HISTORY = gql`
  query familyHistory($patientId: ID!) {
    familyHistory(patientId: $patientId) {
      id
      disease
      relative
    }
  }
`;

export const LIST_EXPENSES = gql`
  query expenses($clinicId: ID!) {
    expenses(clinicId: $clinicId) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const LIST_REVENUES = gql`
  query revenues($clinicId: ID!) {
    revenues(clinicId: $clinicId) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense($expense: ExpenseInput!) {
    createExpense(expense: $expense) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const CREATE_REVENUE = gql`
  mutation createExpense($revenue: RevenueInput!) {
    createRevenue(revenue: $revenue) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation createExpense($expense: ExpenseUpdateInput!) {
    updateExpense(expense: $expense) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const UPDATE_REVENUE = gql`
  mutation createExpense($revenue: RevenueUpdateInput!) {
    updateRevenue(revenue: $revenue) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const CLINIC_USERS = gql`
  query clinicUsers($clinicId: ID!) {
    clinicUsers(clinicId: $clinicId) {
      id
      name
      email
      permissions {
        subject
        action
      }
    }
  }
`;

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
      permissions {
        subject
        action
      }
    }
  }
`;

export const UPDATE_USER_PERMISSIONS = gql`
  mutation updateUserPermissions(
    $userId: ID!
    $permissions: [PermissionInput!]!
  ) {
    updateUserPermissions(userId: $userId, permissions: $permissions)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      token
    }
  }
`;

export const SET_AVATAR = gql`
  mutation setAvatar($url: String!) {
    setAvatar(url: $url)
  }
`;
