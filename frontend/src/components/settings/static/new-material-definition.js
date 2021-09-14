import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput } from 'components';
const model = Schema.Model({});

function NewMaterialDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Material' : 'Edit Material '),
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
          label="Material Name"
          name="name"
          placeholder="Type Material"
          block
        />
      </Form>
    </CRModal>
  );
}

NewMaterialDefinition.defaultProps = {
  type: 'create',
};

export default NewMaterialDefinition;
