import gql from "graphql-tag";

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
      allowedViews
      organizationId
      role {
        permissions {
          subject
          action
          level
        }
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
        position
        organizationId
        language
        allowedViews
        name
        role {
          permissions {
            subject
            action
            level
          }
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
      position
      language
      allowedViews
      organizationId
      name
      role {
        permissions {
          subject
          action
          level
        }
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

export const CHANGE_LANGUAGE = gql`
  mutation changeLanguage($lang: Language!) {
    changeLanguage(lang: $lang) {
      id
      language
    }
  }
`;

export const SET_AVATAR = gql`
  mutation setAvatar($url: String!) {
    setAvatar(url: $url)
  }
`;

// export const MY_NOTIFICATIONS = gql`
//   query myNotifications {
//     myNotifications {
//       message
//       viewed
//     }
//   }
// `;

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
      enableInvoiceCounter
      enableSMS
      orgName
      orgPhoneNo
    }
  }
`;

export const GET_PULSE_CONTROL = gql`
  query getPulseControl {
    getPulseControl {
      id
      before
      after
      date
    }
  }
`;

export const UPDATE_CONFIGURATION = gql`
  mutation updateConfiguration($configuration: ConfigurationInput!) {
    updateConfiguration(configuration: $configuration) {
      id
      enableInvoiceCounter
    }
  }
`;

export const UPDATE_SMS_CONF = gql`
  mutation updateSMSConf($smsConfig: SMSConfigurationInput!) {
    updateSMSConf(smsConfig: $smsConfig) {
      id
      enableSMS
      orgName
      orgPhoneNo
    }
  }
`;

export const ADD_PULSES_CONTROL = gql`
  mutation addPulsesControl($pulsesControl: PulseControlInput!) {
    addPulsesControl(pulsesControl: $pulsesControl) {
      id
      before
      after
      date
    }
  }
`;

export const ADD_PAGE_SETUP = gql`
  mutation addPageSetup($pageSetup: PageSetupInput!) {
    addPageSetup(pageSetup: $pageSetup) {
      id
    }
  }
`;
export const EDIT_POINTS = gql`
  mutation editPoints($points: Int!, $couponValue: Int!) {
    editPoints(points: $points, couponValue: $couponValue) {
      id
    }
  }
`;
export const GET_POINTS = gql`
  {
    points {
      points
      couponValue
    }
  }
`;
export const GET_PAGE_SETUP = gql`
  query getPageSetup {
    getPageSetup {
      top
      right
      bottom
      left
      type
    }
  }
`;
