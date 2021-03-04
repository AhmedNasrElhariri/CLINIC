import gql from 'graphql-tag';

export const GET_INVOICE_COUNTER = gql`
  {
    myInvoiceCounter {
      name
      invoiceCounter
    }
  }
`;