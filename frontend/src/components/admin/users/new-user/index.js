import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal } from 'components';
import { CRSelectInput } from 'components/widgets';
import { POSITIONS } from 'utils/constants';
import { mapObjValuesToChoices } from 'utils/misc';

const { StringType } = Schema.Types;

const positions = mapObjValuesToChoices(POSITIONS);

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('Email is required'),
  password: StringType().isRequired('Password is required'),
  position: StringType().isRequired('Type is required'),
  specialtyId: StringType().isRequired('Specialty is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  position: '',
};

export default function NewUser({ show, onCancel, onCreate, specialties }) {
  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

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
          name="position"
          label="Position"
          block
          data={positions}
        />
      </Form>
    </CRModal>
  );
}

NewUser.propTypes = {};

NewUser.defaultProps = {
  specialties: [],
};
