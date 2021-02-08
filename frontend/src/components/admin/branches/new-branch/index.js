import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal, CRTextArea } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
});

const initialValues = {
  name: '',
  address: '',
  phoneNo: '',
  notes: '',
};

export default function NewBranch({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

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
        <CRTextInput label="Phone" name="phoneNo" />
        <CRTextArea label="Notes" name="notes"></CRTextArea>
      </Form>
    </CRModal>
  );
}

NewBranch.propTypes = {};

NewBranch.defaultProps = {};
