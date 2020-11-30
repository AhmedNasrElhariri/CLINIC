import React, { forwardRef, useRef, useState } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal } from 'components';
import { CRSelectInput, CRTextArea } from 'components/widgets';

import { userTypes, specializationTypes } from 'services/admin';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('Email is required'),
  password: StringType().isRequired('Password is required'),
  type: StringType().isRequired('Type is required'),
  specialization: StringType().isRequired('Specialization is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  type: '',
  specialization: '',
};

export default function NewUser({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);
  const [disable, setDisable] = useState(true);

  const handleChange = event => {
    if (event === 'Doctor') {
      setDisable(false);
    } else {
      setFormValue(pre => ({ ...pre, specialization: '' }));
      setDisable(true);
    }
  };

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
        <CRTextInput label="Email" name="email" type="email" />
        <CRTextInput label="Password" name="password" type="password" />
        <CRSelectInput
          name="type"
          label="Type"
          block
          cleanable={true}
          searchable={true}
          data={userTypes}
          onChange={handleChange}
        />
        <CRSelectInput
          name="specialization"
          label="Specialization"
          block
          cleanable={true}
          searchable={true}
          data={specializationTypes}
          disabled={disable}
        />
        <CRTextArea label="Notes" name="notes"></CRTextArea>
      </Form>
    </CRModal>
  );
}

NewUser.propTypes = {};

NewUser.defaultProps = {};
