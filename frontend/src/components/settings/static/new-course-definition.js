import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput } from 'components';
const model = Schema.Model({});
const coursesType = [
  { label: 'Session', value: 'session' },
  { label: 'Per Unit', value: 'perunit' },
];
function NewCourseDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Course' : 'Edit Course '),
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
          label="Course Name"
          name="name"
          placeholder="Type Course"
          block
        />
        <CRSelectInput
          label="Course type"
          name="type"
          block
          cleanable={false}
          searchable={false}
          data={coursesType}
        />
        <CRTextInput
          label="Course Price"
          name="price"
          placeholder="Type Course Price"
          block
        />
        <CRTextInput
          label="Course units"
          name="units"
          placeholder="Type Course units"
          block
        />
      </Form>
    </CRModal>
  );
}

NewCourseDefinition.defaultProps = {
  type: 'create',
};

export default NewCourseDefinition;
