import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';
const model = Schema.Model({});

function NewBankDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Bank' : 'Edit Bank '),
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
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput
          label="Bank Name"
          name="name"
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
