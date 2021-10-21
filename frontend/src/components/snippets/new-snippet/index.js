import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { Div } from 'components';
import { CRTextArea, CRTextInput, CRModal } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

export default function NewSnippet({
  show,
  onCancel,
  onCreate,
  type,
  formValue,
  onChange,
}) {
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New Snippet'
        : type === 'edit'
        ? 'Edit Snippet'
        : 'delete Snippet',
    [type]
  );
  return (
    <CRModal
      show={show}
      header={header}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form fluid model={model} formValue={formValue} onChange={onChange}>
        {type === 'delete' ? (
          <Div>are you sure that you want to delete the Snippet</Div>
        ) : (
          <>
            <CRTextInput label="Title" name="title" />
            <CRTextArea label="body" name="body"></CRTextArea>
          </>
        )}
      </Form>
    </CRModal>
  );
}
