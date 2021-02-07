import React, { useState } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal, CRTextArea } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
  address: StringType().isRequired('Address is required'),
  phone: StringType().isRequired('Phone is required'),
});

const initialValues = {
  name: '',
  address: '',
  phone: '',
  notes: '',
};

export default function NewBranch({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);

  return (
    <CRModal
      show={show}
      header="New Branch"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput label="Name" name="name" />
        <CRTextInput label="Address" name="address" />
        <CRTextInput label="Phone" name="phone" />
        <CRTextArea label="Notes" name="notes"></CRTextArea>
      </Form>
    </CRModal>
  );
}

NewBranch.propTypes = {};

NewBranch.defaultProps = {};
