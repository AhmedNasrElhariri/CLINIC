import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

const model = Schema.Model({});

function NewLabCategory({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Lab Category' : 'Edit Lab Category '),
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
          label="Lab Category Name"
          name="name"
          placeholder="Type Lab Category"
          block
        />
      </Form>
    </CRModal>
  );
}

NewLabCategory.defaultProps = {
  type: 'create',
};

export default NewLabCategory;
