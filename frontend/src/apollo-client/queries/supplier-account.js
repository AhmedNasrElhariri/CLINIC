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
  {
    myDetailedSupplierAccounts {
      id
      name
      phoneNo
      totalPaid
      totalUnpaid
      invoiceCount
    }
  }
`;

export const LIST_SUPPLIER_INVOICES = gql`
  query ($supplierId: ID!) {
    mySupplierInvoices(supplierId: $supplierId) {
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

export const LIST_INVOICE_TRANSACTIONS = gql`
  query ($invoiceId: ID!) {
    myInvoiceTransactions(invoiceId: $invoiceId) {
      id
      paid
      date
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
    }
  }
`;

export const EDIT_INVOICE = gql`
  mutation editInvoice($invoiceId: ID!, $paid: Int!) {
    editInvoice(invoiceId: $invoiceId, paid: $paid) {
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
