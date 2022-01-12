import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, Div, H3, CRNumberInput } from 'components';

function BankModel({
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
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New Bank Transition'
        : type === 'edit'
        ? 'Edit Bank Transition'
        : 'Delete Bank Transition',
    [type]
  );
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the Bank Transition ? </H3>
          </Div>
        ) : (
          <>
            <CRNumberInput
              label="Amount"
              name="amount"
              placeholder="Type The Amount"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

BankModel.defaultProps = {
  type: 'create',
};

export default BankModel;
