import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput } from 'components';
import { useImageCategory } from 'hooks';
const model = Schema.Model({});

function NewImageDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Image' : 'Edit Image '),
    [type]
  );
  const { imagesCategory } = useImageCategory();
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
          label="Image Name"
          name="name"
          placeholder="Type Image"
          block
        />
        <CRSelectInput
          label="Image Category"
          name="categoryId"
          block
          data={imagesCategory}
        />
      </Form>
    </CRModal>
  );
}

NewImageDefinition.defaultProps = {
  type: 'create',
};

export default NewImageDefinition;
