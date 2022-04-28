import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_SUPPLIER_ACCOUNT,
  EDIT_SUPPLIER_ACCOUNT,
  LIST_SUPPLIER_ACCOUNTS,
  LIST_DETAILED_SUPPLIER_ACCOUNTS,
  LIST_SUPPLIER_INVOICES,
  ADD_SUPPLIER_INVOICE,
  EDIT_INVOICE,
  LIST_INVOICE_TRANSACTIONS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = mySupplierAccounts => {
  client.writeQuery({
    query: LIST_SUPPLIER_ACCOUNTS,
    data: {
      mySupplierAccounts,
    },
  });
};
// const updateInvoiceCache = mySupplierInvoices => {
//   client.writeQuery({
//     query: LIST_SUPPLIER_INVOICES,
//     data: {
//       mySupplierInvoices,
//     },
//   });
// };

function useSupplierAccounts({
  onCreate,
  onEdit,
  onDelete,
  supplierId,
  invoiceId,
} = {}) {
  const { data } = useQuery(LIST_SUPPLIER_ACCOUNTS);
  const supplierAccounts = useMemo(
    () => R.propOr([], 'mySupplierAccounts')(data),
    [data]
  );

  const { data: detailedSupplierAccountData } = useQuery(
    LIST_DETAILED_SUPPLIER_ACCOUNTS
  );
  const detailedSupplierAccounts = useMemo(
    () =>
      R.propOr([], 'myDetailedSupplierAccounts')(detailedSupplierAccountData),
    [detailedSupplierAccountData]
  );

  const { data: supplierInvoicesData } = useQuery(LIST_SUPPLIER_INVOICES, {
    variables: {
      supplierId: supplierId,
    },
  });
  const supplierInvoices = useMemo(
    () => R.propOr([], 'mySupplierInvoices')(supplierInvoicesData),
    [supplierInvoicesData]
  );

  const { data: InvoicesTransactionsData } = useQuery(
    LIST_INVOICE_TRANSACTIONS,
    {
      variables: {
        invoiceId: invoiceId,
      },
    }
  );
  const invoiceTransactions = useMemo(
    () => R.propOr([], 'myInvoiceTransactions')(InvoicesTransactionsData),
    [InvoicesTransactionsData]
  );

  const [addSupplierAccount, { loading }] = useMutation(ADD_SUPPLIER_ACCOUNT, {
    onCompleted() {
      Alert.success('the SupplierAccount has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addSupplierAccount: supplierAccount } }) {
      updateCache([...supplierAccounts, supplierAccount]);
    },
    onError() {
      Alert.error('Failed to add new SupplierAccount');
    },
  });
  const [editSupplierAccount] = useMutation(EDIT_SUPPLIER_ACCOUNT, {
    onCompleted() {
      Alert.success('the SupplierAccount has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the SupplierAccount');
    },
  });
  const [deleteSupplierAccount] = useMutation(EDIT_SUPPLIER_ACCOUNT, {
    onCompleted() {
      Alert.success('the SupplierAccount has been Deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_SUPPLIER_ACCOUNTS,
      },
    ],
    onError() {
      Alert.error('Failed to delete the SupplierAccount');
    },
  });
  const [addSupplierInvoice] = useMutation(ADD_SUPPLIER_INVOICE, {
    onCompleted() {
      Alert.success('the Supplier Invoice has been Added Successfully');
      onCreate && onCreate();
    },
    // update(cache, { data: { addSupplierInvoice: supplierInvoice } }) {
    //   console.log(supplierInvoice,'supplierInvoice');
    //   updateInvoiceCache([...supplierInvoices, supplierInvoice]);
    // },
    refetchQueries: [
      {
        query: LIST_SUPPLIER_INVOICES,
        variables: { supplierId: supplierId },
      },
    ],
    onError() {
      Alert.error('Failed to add new Supplier Invoice');
    },
  });
  const [editInvoice] = useMutation(EDIT_INVOICE, {
    onCompleted() {
      Alert.success('the Invoice has been Edited Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_SUPPLIER_INVOICES,
        variables: { supplierId: supplierId },
      },
      {
        query: LIST_INVOICE_TRANSACTIONS,
        variables: { invoiceId: invoiceId },
      },
    ],
    onError() {
      Alert.error('Failed to edit the Invoice');
    },
  });

  return useMemo(
    () => ({
      supplierAccounts,
      addSupplierAccount,
      editSupplierAccount,
      deleteSupplierAccount,
      detailedSupplierAccounts,
      supplierInvoices,
      addSupplierInvoice,
      editInvoice,
      invoiceTransactions,
      updateCache,
      loading,
    }),
    [
      supplierAccounts,
      addSupplierAccount,
      editSupplierAccount,
      deleteSupplierAccount,
      detailedSupplierAccounts,
      supplierInvoices,
      addSupplierInvoice,
      editInvoice,
      invoiceTransactions,
      loading,
    ]
  );
}

export default useSupplierAccounts;
