import React from 'react';
import { CRModal, Div } from 'components';
import { CRTextArea } from 'components/widgets';
import { Form } from 'rsuite';

const BusinessNotes = ({
  appointment,
  show,
  onCancel,
  onOk,
  notes,
  setNotes,
}) => {
  return (
    <CRModal
      show={show}
      header="Add Notes"
      onOk={onOk}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <Form formValue={notes} onChange={setNotes}>
        <CRTextArea name="businessNotes"/>
      </Form>
    </CRModal>
  );
};



export default BusinessNotes;
