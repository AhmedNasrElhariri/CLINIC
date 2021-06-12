import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';
const model = Schema.Model({});

function NewExpenseTypeDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Expense Type' : 'Edit Expense Type '),
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
          label="Expense Type Name"
          name="name"
          placeholder="Type Expense Type"
          block
        />
      </Form>
    </CRModal>
  );
}

NewExpenseTypeDefinition.defaultProps = {
  type: 'create',
};

export default NewExpenseTypeDefinition;
