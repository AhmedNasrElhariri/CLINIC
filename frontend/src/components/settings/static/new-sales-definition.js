import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRNumberInput } from 'components';


const model = Schema.Model({});

function NewSalesDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Item' : 'Edit Sales Item '),
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
          label="Item Name"
          name="name"
          placeholder="Type Item Name"
          block
        />
        <CRNumberInput
          label="Item Price"
          name="price"
          block
        />
      </Form>
    </CRModal>
  );
}

NewSalesDefinition.defaultProps = {
  type: 'create',
};

export default NewSalesDefinition;
