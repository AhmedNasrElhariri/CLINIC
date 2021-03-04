import gql from 'graphql-tag';

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

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        avatar
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
      avatar
      permissions {
        action
        subject
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

export const MY_NOTIFICATIONS = gql`
  query myNotifications {
    myNotifications {
      message
      viewed
    }
  }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription notifications {
    notifications {
      message
    }
  }
`;

export const CLEAR_NOTIFICATIONS = gql`
  mutation {
    clearNotifications
  }
`;

export const LIST_CONFIGURATIONS = gql`
  query configuration {
    configuration {
      sessions {
        name
        price
      }
      enableInvoiceCounter
    }
  }
`;

export const UPDATE_CONFIGURATION = gql`
  mutation updateConfiguration($configuration: ConfigurationInput!) {
    updateConfiguration(configuration: $configuration) {
      id
      sessions {
        name
        price
      }
      enableInvoiceCounter
    }
  }
`;

