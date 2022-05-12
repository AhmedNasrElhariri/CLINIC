import React, { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSupplierAccounts, useModal } from 'hooks';
import ListSupplierInvoices from './list-supplier-invoices';
import InvoiceData from './invoice';
import { CRButton, Div } from 'components';
import NewInvoice from './new-invoice';
import * as R from 'ramda';
import Filter from './filter';
const initValue = {
  name: '',
  amount: 0,
  invoiceNumber: '',
  description: '',
  paid: 0,
};
const initialFilter = {
  name: '',
};
const inialCurrentPage = {
  activePage: 1,
};

const SupplierAccount = () => {
  const [formValue, setFormValue] = useState(initValue);
  const [filter, setFilter] = useState(initialFilter);
  const [header, setHeader] = useState('');
  const [type, setType] = useState('');
  const { supplierId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const {
    supplierInvoices,
    addSupplierInvoice,
    editInvoice,
    invoiceTransactions,
    supplierInvoicesCount,
    editInvoiceTransaction,
  } = useSupplierAccounts({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    supplierId: supplierId,
    invoiceId: invoice?.id,
    invoicePage: page,
    invoiceFilterName: filter.name,
  });
  const pages = Math.ceil(supplierInvoicesCount / 20);
  const { visible, open, close } = useModal();
  const handleClickCreate = useCallback(() => {
    setType('create');
    setHeader('Add New Invoice');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  const handleClickEditPaid = useCallback(
    data => {
      const invoice = R.pick(['id'])(data);
      setType('edit');
      setHeader('Add New Payment');
      setFormValue({ ...invoice, paid: 0 });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditTransaction = useCallback(
    data => {
      const invoice = R.pick(['id', 'paid'])(data);
      setType('editTransaction');
      setHeader('Edit Paid Transaction');
      setFormValue({ ...invoice });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      const newFormValue = { ...formValue, supplierId: supplierId };
      addSupplierInvoice({
        variables: {
          supplierInvoice: newFormValue,
        },
      });
    } else if (type === 'editTransaction') {
      editInvoiceTransaction({
        variables: {
          transactionId: formValue.id,
          paid: formValue.paid,
        },
      });
    } else {
      editInvoice({
        variables: {
          invoiceId: formValue.id,
          paid: formValue.paid,
        },
      });
    }
  }, [
    addSupplierInvoice,
    editInvoice,
    editInvoiceTransaction,
    formValue,
    type,
  ]);
  const allInvoices = useCallback(() => {
    setInvoice({});
  }, [setInvoice]);
  const updatedInvoice = useMemo(() => {
    const upIn = supplierInvoices.find(i => i.id === invoice.id);
    return upIn;
  }, [supplierInvoices, invoice]);
  console.log(formValue, 'formValue');
  return (
    <>
      {Object.keys(invoice).length !== 0 ? (
        <InvoiceData
          invoice={updatedInvoice}
          onEditPaid={handleClickEditPaid}
          invoiceTransactions={invoiceTransactions}
          allInvoices={allInvoices}
          onEditTransaction={handleClickEditTransaction}
        />
      ) : (
        <>
          <Div display="flex" justifyContent="space-between">
            <Filter formValue={filter} onChange={setFilter} />
            <CRButton mb="10px" mt="40px" onClick={handleClickCreate}>
              Add New Invoice
            </CRButton>
          </Div>
          <ListSupplierInvoices
            invoices={supplierInvoices}
            setInvoice={setInvoice}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
        </>
      )}
      <NewInvoice
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        header={header}
        type={type}
      />
    </>
  );
};
export default SupplierAccount;
