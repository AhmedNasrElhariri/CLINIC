import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput, CRNumberInput } from 'components';
const model = Schema.Model({});
const coursesType = [
  { label: 'Session', value: 'Session' },
  { label: 'Per Unit', value: 'Perunit' },
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
        <CRNumberInput label="Price" name="price" />
        <CRNumberInput label="Number of Sessions/Units" name="units" />
        {formValue.type === 'perunit' ? (
          <CRTextInput
            label="Messure Of Units"
            name="messureOfUnits"
            placeholder="Type Messure Of Units"
            block
          />
        ) : (
          <></>
        )}
      </Form>
    </CRModal>
  );
}

NewCourseDefinition.defaultProps = {
  type: 'create',
};

export default NewCourseDefinition;
