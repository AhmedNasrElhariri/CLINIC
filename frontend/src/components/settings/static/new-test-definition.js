import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput } from 'components';
import { useLabCategory } from 'hooks';

const model = Schema.Model({});

function NewLabDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Lab' : 'Edit Lab '),
    [type]
  );
  const { labsCategory } = useLabCategory();
  const categories = labsCategory.map(category => ({
    id: category.name,
    name: category.name,
  }));
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
          label="Lab Name"
          name="name"
          placeholder="Type Lab"
          block
        />
        <CRSelectInput
          label="Lab Category"
          name="category"
          block
          data={categories}
        />
      </Form>
    </CRModal>
  );
}

NewLabDefinition.defaultProps = {
  type: 'create',
};

export default NewLabDefinition;
