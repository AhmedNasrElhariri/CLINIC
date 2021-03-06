import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput,CRSelectInput } from 'components';
import useLabsCategory from 'hooks/fetch-labs-category';

const model = Schema.Model({});

function NewTestDefinition({
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
  const { labsCategory } = useLabsCategory();
  const categories = labsCategory.map(category => ({
    label: category.name,
    value: category.name,
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
          name="testName"
          placeholder="Type Test"
          block
        />
        <CRSelectInput
          label="Lab Category"
          name="category"
          block
          cleanable={false}
          searchable={false}
          data={categories}
        />
      </Form>
    </CRModal>
  );
}

NewTestDefinition.defaultProps = {
  type: 'create',
};

export default NewTestDefinition;
