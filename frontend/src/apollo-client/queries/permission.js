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

export const CREATE_ROLE = gql`
  mutation createRole($role: RoleInput!) {
    createRole(role: $role) {
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
