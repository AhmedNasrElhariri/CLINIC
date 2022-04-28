import React, { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSupplierAccounts, useModal } from 'hooks';
import ListSupplierInvoices from './list-supplier-invoices';
import InvoiceData from './invoice';
import { CRButton, Div } from 'components';
import NewInvoice from './new-invoice';
import * as R from 'ramda';

const initValue = {
  name: '',
  amount: 0,
  invoiceNumber: '',
  description: '',
  paid: 0,
};

const SupplierAccount = () => {
  const [formValue, setFormValue] = useState(initValue);
  const [header, setHeader] = useState('');
  const [type, setType] = useState('');
  const { supplierId } = useParams();
  const [invoice, setInvoice] = useState({});
  const {
    supplierInvoices,
    addSupplierInvoice,
    editInvoice,
    invoiceTransactions,
  } = useSupplierAccounts({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    supplierId: supplierId,
    invoiceId: invoice?.id,
  });
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
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      const newFormValue = { ...formValue, supplierId: supplierId };
      addSupplierInvoice({
        variables: {
          supplierInvoice: newFormValue,
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
  }, [addSupplierInvoice, editInvoice, formValue, type]);
  const allInvoices = useCallback(() => {
    setInvoice({});
  }, [setInvoice]);
  const updatedInvoice = useMemo(() => {
    const upIn = supplierInvoices.find(i => i.id === invoice.id);
    return upIn;
  }, [supplierInvoices, invoice]);
  console.log(updatedInvoice, 'updatedInvoice');
  return (
    <>
      {Object.keys(invoice).length !== 0 ? (
        <InvoiceData
          invoice={updatedInvoice}
          onEditPaid={handleClickEditPaid}
          invoiceTransactions={invoiceTransactions}
          allInvoices={allInvoices}
        />
      ) : (
        <>
          <Div textAlign="right">
            <CRButton mb="10px" onClick={handleClickCreate}>
              Add New Invoice
            </CRButton>
          </Div>
          <ListSupplierInvoices
            invoices={supplierInvoices}
            setInvoice={setInvoice}
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
