import React from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRTextInput,
  CRNumberInput,
  CRTextArea,
  CRSelectInput,
  CRButton,
  CRDatePicker,
} from 'components';
import { useSupplierAccounts } from 'hooks';

function NewInvoice({
  formValue,
  onChange,
  visible,
  onOk,
  onClose,
  header,
  type,
  setPayByCheck,
  payByCheck,
}) {
  const { supplierAccounts } = useSupplierAccounts({});
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <>
          {type === 'create' ? (
            <>
              <CRTextInput
                label="Name"
                name="name"
                placeholder="Type Name"
                block
              />
              <CRNumberInput
                name="amount"
                label="Amount"
                value={formValue.amount}
              />
              <CRNumberInput name="paid" label="Paid" value={formValue.paid} />
              <CRTextInput
                label="Invoice Number"
                name="invoiceNumber"
                placeholder="Type Invoice Number"
                block
              />
              <CRTextArea
                label="Description"
                name="description"
                placeholder="Type the Description"
                block
              />
            </>
          ) : type === 'editInvoiceSupplier' ? (
            <CRSelectInput
              name="supplierId"
              value={formValue.supplierId}
              data={supplierAccounts}
              block
            />
          ) : (
            <>
              <CRButton onClick={() => setPayByCheck(!payByCheck)}>
                Pay by Check
              </CRButton>
              <CRNumberInput name="paid" label="Paid" value={formValue.paid} />
              {payByCheck && (
                <>
                  <CRTextInput
                    label="Check Number"
                    name="checkNumber"
                    placeholder="Type Check Number"
                    block
                  />
                  <CRDatePicker label="Check Due Date" block name="checkDate" />
                </>
              )}
            </>
          )}
        </>
      </Form>
    </CRModal>
  );
}

NewInvoice.defaultProps = {
  type: 'create',
};

export default NewInvoice;
