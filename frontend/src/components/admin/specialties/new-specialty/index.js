import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
});

const initialValues = {
  name: '',
};

export default function NewSpecialty({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

  return (
    <CRModal
      show={show}
      header="New Specialty"
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

NewSpecialty.propTypes = {};

NewSpecialty.defaultProps = {};
