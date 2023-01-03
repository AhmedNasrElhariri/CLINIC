import gql from 'graphql-tag';

export const LIST_EXPENSES = gql`
  query expenses(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $expenseType: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $expenseName: String
  ) {
    expenses(
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      expenseType: $expenseType
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      expenseName: $expenseName
    ) {
      expenses {
        id
        name
        amount
        expenseType
        date
        invoiceNo
        user {
          id
          name
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
        doctor {
          id
          name
        }
      }
      totalExpenses
      expensesCount
    }
  }
`;

export const LIST_REVENUES = gql`
  query revenues(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $revenueName: String
  ) {
    revenues(
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      revenueName: $revenueName
    ) {
      revenues {
        id
        name
        amount
        date
        invoiceNo
        payer
        user {
          id
          name
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
        doctor {
          id
          name
        }
      }
      totalRevenues
      revenuesCount
    }
  }
`;

export const LIST_ALL_REVENUES = gql`
  query allRevenues(
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $revenueName: String
  ) {
    allRevenues(
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      revenueName: $revenueName
    ) {
      id
      name
      amount
      date
      invoiceNo
      payer
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
      doctor {
        id
        name
      }
    }
  }
`;

export const LIST_ALL_EXPENSES = gql`
  query allExpenses(
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $expenseType: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $expenseName: String
  ) {
    allExpenses(
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      expenseType: $expenseType
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      expenseName: $expenseName
    ) {
      id
      name
      amount
      expenseType
      date
      invoiceNo
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
      doctor {
        id
        name
      }
    }
  }
`;

export const LIST_BANK_REVENUES = gql`
  query bankRevenues(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $bankId: ID
    $revenueName: String
  ) {
    bankRevenues(
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      bankId: $bankId
      revenueName: $revenueName
    ) {
      bankRevenues {
        id
        name
        amount
        bank {
          id
          name
        }
        date
        invoiceNo
        payer
        checkNumber
        user {
          id
          name
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
        doctor {
          id
          name
        }
      }
      totalRevenues
      revenuesCount
    }
  }
`;

export const LIST_BANK_EXPENSES = gql`
  query bankExpenses(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $bankId: ID
  ) {
    bankExpenses(
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      bankId: $bankId
    ) {
      bankExpenses {
        id
        name
        amount
        bank {
          id
          name
        }
        date
        invoiceNo
        checkNumber
        expenseType
        payer
        user {
          id
          name
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
        doctor {
          id
          name
        }
      }
      totalExpenses
      expensesCount
    }
  }
`;

export const EDIT_BANK_REVENUE = gql`
  mutation editBankRevenue($bankTransition: BankTransitionInput!) {
    editBankRevenue(bankTransition: $bankTransition) {
      id
      amount
    }
  }
`;
export const EDIT_BANK_EXPENSE = gql`
  mutation editBankExpense($bankTransition: BankExpenseTransitionInput!) {
    editBankExpense(bankTransition: $bankTransition) {
      id
      amount
    }
  }
`;
export const CREATE_BANK_REVENUE = gql`
  mutation createBankRevenue($bankTransition: BankTransitionInput!) {
    createBankRevenue(bankTransition: $bankTransition) {
      id
      amount
    }
  }
`;
export const CREATE_BANK_EXPENSE = gql`
  mutation createBankExpense($bankTransition: BankExpenseTransitionInput!) {
    createBankExpense(bankTransition: $bankTransition) {
      id
      amount
    }
  }
`;

export const LIST_INSURANCE_TRANSACTIONS = gql`
  query insuranceTransactions(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
    $companyId: ID
  ) {
    insuranceTransactions(
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
      companyId: $companyId
    ) {
      insuranceTransactions {
        id
        name
        amount
        payer
        cardId
        company {
          id
          name
        }
        user {
          id
          name
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
        doctor {
          id
          name
        }
        date
        invoiceNo
      }
      totalInsuranceDebit
      InsuranceDebitCount
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
  mutation updateExpense($expense: ExpenseUpdateInput!) {
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
  mutation updateRevenue($revenue: RevenueUpdateInput!) {
    updateRevenue(revenue: $revenue) {
      id
      name
      amount
      date
      invoiceNo
    }
  }
`;

export const LIST_EXPENSE_TYPES_DEFINITION = gql`
  {
    myExpenseTypesDefinition {
      id
      name
    }
  }
`;

export const ADD_EXPENSE_TYPE_DEFINITION = gql`
  mutation addExpenseTypeDefinition(
    $expenseTypeDefinition: ExpenseTypeInputDefinition!
  ) {
    addExpenseTypeDefinition(expenseTypeDefinition: $expenseTypeDefinition) {
      id
      name
    }
  }
`;

export const EDIT_EXPENSE_TYPE_DEFINITION = gql`
  mutation editExpenseTypeDefinition(
    $expenseTypeDefinition: ExpenseTypeInputDefinition!
  ) {
    editExpenseTypeDefinition(expenseTypeDefinition: $expenseTypeDefinition) {
      id
      name
    }
  }
`;
