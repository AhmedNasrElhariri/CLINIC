import gql from 'graphql-tag';

export const LIST_SUPPLIER_ACCOUNTS = gql`
  {
    mySupplierAccounts {
      id
      name
      phoneNo
    }
  }
`;

export const LIST_DETAILED_SUPPLIER_ACCOUNTS = gql`
  query myDetailedSupplierAccounts($offset: Int, $limit: Int, $name: String) {
    myDetailedSupplierAccounts(offset: $offset, limit: $limit, name: $name) {
      supplierAccounts {
        id
        name
        phoneNo
        totalPaid
        totalUnpaid
        invoiceCount
      }
      supplierAccountsCount
    }
  }
`;

export const LIST_SUPPLIER_INVOICES = gql`
  query mySupplierInvoices(
    $offset: Int
    $limit: Int
    $name: String
    $supplierId: ID
  ) {
    mySupplierInvoices(
      offset: $offset
      limit: $limit
      name: $name
      supplierId: $supplierId
    ) {
      invoices {
        id
        name
        amount
        paid
        invoiceNumber
        description
        status
      }
      invoicesCount
    }
  }
`;

export const LIST_INVOICE_TRANSACTIONS = gql`
  query ($invoiceId: ID!) {
    myInvoiceTransactions(invoiceId: $invoiceId) {
      id
      paid
      date
      checkNumber
      checkDate
      type
      user {
        id
        name
      }
    }
  }
`;

// export const INVOICE_DATA = gql`
//   query ($invoiceId: ID!) {
//     invoiceData(invoiceId: $supplierId) {
//       id
//       name
//       amount
//       paid
//       invoiceNumber
//       description
//     }
//   }
// `;

export const ADD_SUPPLIER_ACCOUNT = gql`
  mutation addSupplierAccount($supplierAccount: SupplierAccountInput!) {
    addSupplierAccount(supplierAccount: $supplierAccount) {
      id
      name
      phoneNo
    }
  }
`;
export const ADD_SUPPLIER_INVOICE = gql`
  mutation addSupplierInvoice($supplierInvoice: SupplierInvoiceInput!) {
    addSupplierInvoice(supplierInvoice: $supplierInvoice) {
      id
      name
      amount
      paid
      invoiceNumber
      description
      status
    }
  }
`;

export const EDIT_INVOICE = gql`
  mutation editInvoice(
    $invoiceId: ID!
    $paid: Int!
    $checkNumber: String
    $checkDate: Date
  ) {
    editInvoice(
      invoiceId: $invoiceId
      paid: $paid
      checkNumber: $checkNumber
      checkDate: $checkDate
    ) {
      id
    }
  }
`;
export const EDIT_INVOICE_SUPPLIER = gql`
  mutation editInvoiceSupplier($id: ID!, $supplierId: ID!) {
    editInvoiceSupplier(id: $id, supplierId: $supplierId) {
      id
    }
  }
`;
export const EDIT_INVOICE_TRANSACTION = gql`
  mutation editInvoiceTransaction($transactionId: ID!, $paid: Int!) {
    editInvoiceTransaction(transactionId: $transactionId, paid: $paid) {
      id
    }
  }
`;

export const EDIT_SUPPLIER_ACCOUNT = gql`
  mutation editSupplierAccount(
    $supplierAccount: SupplierAccountInput!
    $type: String!
  ) {
    editSupplierAccount(supplierAccount: $supplierAccount, type: $type) {
      id
      name
      phoneNo
    }
  }
`;
