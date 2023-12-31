import gql from 'graphql-tag';

export const LIST_PAY_ROLL_USERS = gql`
  {
    payrollUsers {
      id
      salary
      user {
        id
        name
        position
      }
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

export const USER_COURSE_PAYMENT = gql`
  query userCoursePayment(
    $userId: ID!
    $period: [String!]
    $doctorId: ID
    $specialtyId: ID
    $branchId: ID
  ) {
    userCoursePayment(
      userId: $userId
      period: $period
      doctorId: $doctorId
      specialtyId: $specialtyId
      branchId: $branchId
    ) {
      id
      payment
      date
    }
  }
`;

export const TRANSCTION_COURSES_TIMEFRAME = gql`
  query transactionCoursesTimeFrame($userId: ID!) {
    transactionCoursesTimeFrame(userId: $userId) {
      id
      date
    }
  }
`;

export const TRANSCTION_REVENUES_TIMEFRAME = gql`
  query transactionRevenuesTimeFrame($userId: ID!) {
    transactionRevenuesTimeFrame(userId: $userId) {
      id
      date
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

export const EDIT_PAYROLL_TRANSACTION = gql`
  mutation editPayrollTransaction($id: ID!, $amount: Int!) {
    editPayrollTransaction(id: $id, amount: $amount) {
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

export const ADD_PAY_ROLL = gql`
  mutation addPayroll(
    $payment: [ID!]
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
  ) {
    addPayroll(
      payment: $payment
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
    ) {
      id
    }
  }
`;
