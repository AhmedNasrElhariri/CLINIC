import gql from 'graphql-tag';

export const LIST_PAY_ROLL_USERS = gql`
  {
    myPayRollUsers {
      id
      salary
      netSalary
      user {
        name
        position
      }
    }
  }
`;
export const LIST_USER_TRANSACTIONS = gql`
  query myUserTransactions($userId: ID!) {
    myUserTransactions(userId: $userId) {
      id
      amount
      type
      date
      payRollUser{
        salary
      }
    }
  }
`;

export const ADD_PAYROLL_USER = gql`
  mutation addPayRollUser($payRollUser: PayRollUserInput!) {
    addPayRollUser(payRollUser: $payRollUser) {
      id
    }
  }
`;

export const DELETE_PAYROLL_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      id
    }
  }
`;

export const ADD_PAYROLL_TRANSACTION = gql`
  mutation addTransaction($payRollTransaction: PayRollTransactionInput!) {
    addTransaction(payRollTransaction: $payRollTransaction) {
      id
    }
  }
`;

export const ADD_PAY_ROLL_PAYMENT = gql`
  mutation addPayRollPayment($payment: Int!) {
    addPayRollPayment(payment: $payment) {
      id
    }
  }
`
