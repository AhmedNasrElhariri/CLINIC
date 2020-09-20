import gql from 'graphql-tag';

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
