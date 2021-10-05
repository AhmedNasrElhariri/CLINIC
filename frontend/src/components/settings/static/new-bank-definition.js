import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

function NewBankDefinition({
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
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Bank' : 'Edit Bank '),
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        setShow(true);
        validate && onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRTextInput
          label="Bank Name"
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          placeholder="Type Bank"
          block
        />
      </Form>
    </CRModal>
  );
}

NewBankDefinition.defaultProps = {
  type: 'create',
};

export default NewBankDefinition;
