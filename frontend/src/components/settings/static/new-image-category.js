import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

const model = Schema.Model({});
function NewImageCategory({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () =>
      type === 'create' ? 'Add New Image Category' : 'Edit Image Category',
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
        <CRTextInput label="Name" name="name" placeholder="Type Name" block />
      </Form>
    </CRModal>
  );
}

NewImageCategory.defaultProps = {
  type: 'create',
};

export default NewImageCategory;
