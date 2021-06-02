import gql from 'graphql-tag';

export const LIST_PAY_ROLL_USERS = gql`
  {
    payrollUsers {
      id
      salary
      name
    }
  }
`;

export const PAYSLIPS = gql`
  {
    payslips {
      id
      name
      amount
    }
  }
`;

export const LIST_USER_TRANSACTIONS = gql`
  query userTransactions($userId: ID!) {
    userTransactions(userId: $userId) {
      id
      amount
      type
      date
      reason
      payrollUser {
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
  mutation deletePayrollUser($userId: ID!) {
    deletePayrollUser(userId: $userId) {
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

export const ADD_PAY_ROLL = gql`
  mutation addPayroll($payment: [ID!]) {
    addPayroll(payment: $payment) {
      id
    }
  }
`;
