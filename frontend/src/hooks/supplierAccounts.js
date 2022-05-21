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
  EDIT_INVOICE_TRANSACTION,
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
const updateInvoiceCache = mySupplierInvoices => {
  
  client.writeQuery({
    query: LIST_SUPPLIER_INVOICES,
    data: {
      mySupplierInvoices,
    },
  });
};

function useSupplierAccounts({
  onCreate,
  onEdit,
  onDelete,
  supplierId,
  invoiceId,
  name,
  page,
  invoiceFilterName,
  invoicePage=0,
} = {}) {
  const { data } = useQuery(LIST_SUPPLIER_ACCOUNTS);
  const supplierAccounts = useMemo(
    () => R.propOr([], 'mySupplierAccounts')(data),
    [data]
  );

  const { data: detailedSupplierAccountData } = useQuery(
    LIST_DETAILED_SUPPLIER_ACCOUNTS,
    {
      variables: Object.assign(
        {
          offset: (page - 1) * 20 || 0,
          limit: 20,
        },
        name && { name: name }
      ),
    }
  );
  const detailedSupplierAccountDataa = detailedSupplierAccountData?.myDetailedSupplierAccounts;
  // R.propOr(
  //   {},
  //   'myDetailedSupplierAccounts'
  // )(detailedSupplierAccountData);

  const detailedSupplierAccounts = useMemo(
    () => R.propOr([], 'supplierAccounts')(detailedSupplierAccountDataa),
    [detailedSupplierAccountDataa]
  );
  const detailedSupplierAccountsCount = useMemo(
    () => R.propOr(0, 'supplierAccountsCount')(detailedSupplierAccountDataa),
    [detailedSupplierAccountDataa]
  );

  const { data: supplierInvoicesData } = useQuery(LIST_SUPPLIER_INVOICES, {
    variables: Object.assign(
      {
        offset: (invoicePage - 1) * 20 || 0,
        limit: 20,
        supplierId: supplierId,
      },
      invoiceFilterName && { name: invoiceFilterName }
    ),
  });
  const supplierInvoicesDataa = R.propOr(
    {},
    'mySupplierInvoices'
  )(supplierInvoicesData);
  const supplierInvoices = useMemo(
    () => R.propOr([], 'invoices')(supplierInvoicesDataa),
    [supplierInvoicesDataa]
  );
  const supplierInvoicesCount = useMemo(
    () => R.propOr(0, 'invoicesCount')(supplierInvoicesDataa),
    [supplierInvoicesDataa]
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
    refetchQueries: [
      {
        query: LIST_SUPPLIER_INVOICES,
        variables: { supplierId: supplierId, offset: 0, limit: 20},
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
        variables: { supplierId: supplierId, offset: 0, limit: 20, name: '' },
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
  const [editInvoiceTransaction] = useMutation(EDIT_INVOICE_TRANSACTION, {
    onCompleted() {
      Alert.success('the Transaction has been Edited Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_INVOICE_TRANSACTIONS,
        variables: { invoiceId: invoiceId },
      },
      {
        query: LIST_SUPPLIER_INVOICES,
        variables: { supplierId: supplierId, offset: 0, limit: 20, name: '' },
      },
    ],
    onError() {
      Alert.error('Failed to edit the Transaction');
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
      detailedSupplierAccountsCount,
      supplierInvoicesCount,
      editInvoiceTransaction,
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
      detailedSupplierAccountsCount,
      supplierInvoicesCount,
      editInvoiceTransaction,
      loading,
    ]
  );
}

export default useSupplierAccounts;
