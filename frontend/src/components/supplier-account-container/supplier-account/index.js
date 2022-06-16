import React, { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSupplierAccounts, useModal } from 'hooks';
import ListSupplierInvoices from './list-supplier-invoices';
import InvoiceData from './invoice';
import { CRButton, Div } from 'components';
import NewInvoice from './new-invoice';
import * as R from 'ramda';
import Filter from './filter';
import { useTranslation } from 'react-i18next';

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
  const [payByCheck, setPayByCheck] = useState(false);
  const [type, setType] = useState('');
  const { supplierId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const { t } = useTranslation();

  const page = currentPage?.activePage;
  const {
    supplierInvoices,
    addSupplierInvoice,
    editInvoice,
    invoiceTransactions,
    supplierInvoicesCount,
    editInvoiceTransaction,
    editInvoiceSupplier,
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
    setHeader(t('addNewInvoice'));
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  const handleClickEditPaid = useCallback(
    data => {
      const invoice = R.pick(['id'])(data);
      setType('edit');
      setHeader(t('addNewPayment'));
      setFormValue({ ...invoice, paid: 0 });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditTransaction = useCallback(
    data => {
      const invoice = R.pick(['id', 'paid'])(data);
      setType('editTransaction');
      setHeader(t('editPaidTransaction'));
      setFormValue({ ...invoice });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditInvoice = useCallback(
    data => {
      const id = data.id;
      setType('editInvoiceSupplier');
      setHeader(t('changeTheSupplier'));
      setFormValue({ id: id });
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
    } else if (type === 'editInvoiceSupplier') {
      editInvoiceSupplier({
        variables: {
          id: formValue.id,
          supplierId: formValue.supplierId,
        },
      });
    } else {
      editInvoice({
        variables: {
          invoiceId: formValue.id,
          paid: formValue.paid,
          checkNumber: formValue?.checkNumber,
          checkDate: formValue?.checkDate,
        },
      });
    }
  }, [
    addSupplierInvoice,
    editInvoice,
    editInvoiceTransaction,
    editInvoiceSupplier,
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
  return (
    <>
      {Object.keys(invoice).length !== 0 ? (
        <InvoiceData
          invoice={updatedInvoice}
          onEditPaid={handleClickEditPaid}
          invoiceTransactions={invoiceTransactions}
          allInvoices={allInvoices}
          onEditTransaction={handleClickEditTransaction}
          t={t}
        />
      ) : (
        <>
          <Div display="flex" justifyContent="space-between">
            <Filter formValue={filter} onChange={setFilter} t={t} />
            <CRButton mb="10px" mt="40px" onClick={handleClickCreate}>
              {t('addNewInvoice')}
            </CRButton>
          </Div>
          <ListSupplierInvoices
            invoices={supplierInvoices}
            setInvoice={setInvoice}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            onEdit={handleClickEditInvoice}
            t={t}
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
        setPayByCheck={setPayByCheck}
        payByCheck={payByCheck}
        t={t}
      />
    </>
  );
};
export default SupplierAccount;