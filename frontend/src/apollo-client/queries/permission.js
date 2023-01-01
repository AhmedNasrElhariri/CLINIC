import gql from 'graphql-tag';

export const GET_ACTIONS = gql`
  {
    getActions
  }
`;

export const LIST_BRANCHES = gql`
  {
    listBranches {
      id
      name
      phoneNo
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

export const LIST_SPECIALTIES = gql`
  {
    listSpecialties {
      id
      name
      branches {
        id
        name
      }
      doctors {
        id
        name
      }
    }
  }
`;

export const LIST_USERS = gql`
  {
    listUsers {
      id
      name
      email
      allowedViews
      position
      specialty {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
`;

export const LIST_ROLES = gql`
  {
    listRoles {
      id
      name
      users {
        id
        name
      }
      permissions {
        id
        level
        action
        subject
        all
        rules {
          organizationId
          branchId
          specialtyId
          userId
        }
      }
    }
  }
`;

export const CREATE_OR_UPDATE_ROLE = gql`
  mutation createOrUpdateRole($role: RoleInput!) {
    createOrUpdateRole(role: $role) {
      id
    }
  }
`;

export const CREATE_BRANCH = gql`
  mutation createBranch($branch: BranchInput!) {
    createBranch(branch: $branch) {
      id
    }
  }
`;

export const CREATE_SPECIALITY = gql`
  mutation createSpecialty($specialty: SpecialtyInput!) {
    createSpecialty(specialty: $specialty) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($user: UserInput!) {
    editUser(user: $user) {
      id
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
export const DELETE_BRANCH = gql`
  mutation deleteBranch($id: ID!) {
    deleteBranch(id: $id)
  }
`;
export const DELETE_SPECIALTY = gql`
  mutation deleteSpecialty($id: ID!) {
    deleteSpecialty(id: $id)
  }
`;

export const ADD_SPECIALITY = gql`
  mutation addSpecialty($branchId: ID!, $specialtyId: ID!) {
    addSpecialty(branchId: $branchId, specialtyId: $specialtyId) {
      id
    }
  }
`;

export const ADD_DOCTOR = gql`
  mutation addDoctor($branchId: ID!, $specialtyId: ID!, $userId: ID!) {
    addDoctor(branchId: $branchId, specialtyId: $specialtyId, userId: $userId) {
      id
    }
  }
`;

export const ASSIGN_ROLE_TO_DOCOTR = gql`
  mutation assignRoleToUser($userId: ID!, $roleId: ID!) {
    assignRoleToUser(userId: $userId, roleId: $roleId)
  }
`;

export const DELETE_ROLE_TO_USER = gql`
  mutation deleteRoleToUser($userId: ID!, $roleId: ID!) {
    deleteRoleToUser(userId: $userId, roleId: $roleId)
  }
`;

export const LIST_BRANCHES_TREE = gql`
  query listBranchesTree($action: String!) {
    listBranchesTree(action: $action) {
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

export const APPOINTMENTS_DAY_COUNT = gql`
  query appointmentsDayCount($date: Date, $userId: ID) {
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

export const LIST_ACTION_USERS = gql`
  query listActionUsers($action: String!) {
    listActionUsers(action: $action) {
      id
      name
    }
  }
`;

export const LIST_ACTION_DOCTORS = gql`
  query listActionDoctors($action: String!) {
    listActionDoctors(action: $action) {
      id
      name
    }
  }
`;
export const ADD_SESSION_TO_DOCTOR = gql`
  mutation addSessionToDoctor($doctorSession: DoctorSessionDefinationInput!) {
    addSessionToDoctor(doctorSession: $doctorSession) {
      id
    }
  }
`;
export const DELETE_SESSION_TO_DOCTOR = gql`
  mutation deleteSessionToDoctor($sessionId: ID!) {
    deleteSessionToDoctor(sessionId: $sessionId) {
      id
    }
  }
`;
export const LIST_DOCTOR_SESSION_DEFINATION = gql`
  query doctorSessionsDefinations($doctorId: ID!) {
    doctorSessionsDefinations(doctorId: $doctorId) {
      id
      feesCalculationMethod
      feesCalculationType
      fees
      session {
        name
      }
      doctor {
        name
      }
    }
  }
`;
