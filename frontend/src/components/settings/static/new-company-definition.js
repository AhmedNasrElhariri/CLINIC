import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';
const model = Schema.Model({});

function NewCompanyDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Company' : 'Edit Company '),
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
          label="Company Name"
          name="name"
          placeholder="Type Company"
          block
        />
      </Form>
    </CRModal>
  );
}

NewCompanyDefinition.defaultProps = {
  type: 'create',
};

export default NewCompanyDefinition;
