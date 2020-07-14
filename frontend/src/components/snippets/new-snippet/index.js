import React, { useState } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextArea, CRTextInput, CRModal } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  title: '',
  body: '',
};

export default function NewSnippet({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);

  return (
    <CRModal
      show={show}
      header="New Snippet"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput label="Title" name="title" />
        <CRTextArea label="body" name="body"></CRTextArea>
      </Form>
    </CRModal>
  );
}

NewSnippet.propTypes = {};

NewSnippet.defaultProps = {};
