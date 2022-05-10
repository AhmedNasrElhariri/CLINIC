import React from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, CRNumberInput ,CRTextArea} from 'components';

function NewInvoice({
  formValue,
  onChange,
  visible,
  onOk,
  onClose,
  header,
  type,
}) {
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
          ) : (
            <CRNumberInput name="paid" label="Paid" value={formValue.paid} />
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
