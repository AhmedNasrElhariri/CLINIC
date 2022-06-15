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
  t,
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
                label={t('name')}
                name="name"
                placeholder="Type Name"
                block
              />
              <CRNumberInput
                name="amount"
                label={t('revenueAmount')}
                value={formValue.amount}
              />
              <CRNumberInput
                name="paid"
                label={t('paid')}
                value={formValue.paid}
              />
              <CRTextInput
                label={t('invoiceNo')}
                name="invoiceNumber"
                placeholder="Type Invoice Number"
                block
              />
              <CRTextArea
                label={t('description')}
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
                {t('payByCheck')}
              </CRButton>
              <CRNumberInput name="paid" label="Paid" value={formValue.paid} />
              {payByCheck && (
                <>
                  <CRTextInput
                    label={t('checkNo')}
                    name="checkNumber"
                    placeholder="Type Check Number"
                    block
                  />
                  <CRDatePicker
                    label={t('checkDueDate')}
                    block
                    name="checkDate"
                  />
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
