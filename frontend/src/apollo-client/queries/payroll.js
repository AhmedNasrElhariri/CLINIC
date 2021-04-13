import gql from 'graphql-tag';

export const LIST_PAY_ROLL_USERS = gql`
  {
    myPayrollUsers {
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
      payrollUser{
        salary
      }
    }
  }
`;

export const ADD_PAYROLL_USER = gql`
  mutation addPayrollUser($payrollUser: PayrollUserInput!) {
    addPayrollUser(payrollUser: $payrollUser) {
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
  mutation addTransaction($payrollTransaction: PayrollTransactionInput!) {
    addTransaction(payrollTransaction: $payrollTransaction) {
      id
    }
  }
`;

export const ADD_PAY_ROLL_PAYMENT = gql`
  mutation addPayrollPayment($payment: Int!) {
    addPayrollPayment(payment: $payment) {
      id
    }
  }
`
