import React, { useState } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
});

const initialValues = {
  name: '',
};

export default function NewUser({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);

  return (
    <CRModal
      show={show}
      header="New User"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput label="Name" name="name" />
      </Form>
    </CRModal>
  );
}

NewUser.propTypes = {};

NewUser.defaultProps = {};
