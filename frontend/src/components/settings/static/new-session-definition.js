import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput } from 'components';
const model = Schema.Model({});

function NewSessionDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Session' : 'Edit Session '),
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
          label="Session Name"
          name="name"
          placeholder="Type Session"
          block
        />
      </Form>
    </CRModal>
  );
}

NewSessionDefinition.defaultProps = {
  type: 'create',
};

export default NewSessionDefinition;
