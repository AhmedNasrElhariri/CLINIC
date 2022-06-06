import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRNumberInput } from 'components';

function EditTransaction({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
  loading,
}) {
  const header = 'Edit the transaction';
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRNumberInput
          label="Amount"
          name="amount"
          placeholder="Type Amount"
          block
        />
      </Form>
    </CRModal>
  );
}

EditTransaction.defaultProps = {
  type: 'create',
};

export default EditTransaction;
