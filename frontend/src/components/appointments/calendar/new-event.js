import React, { useState } from 'react';

import { CRModal, Div, CRTextInput, CRTimePicker } from 'components';
import { Form } from 'rsuite';

function NewEvent({ show, onOk, onCancel, formValue, onChange }) {
  return (
    <CRModal
      onHide={onCancel}
      onOk={() => onOk(formValue)}
      onCancel={onCancel}
      show={show}
      header="New Custom Event"
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <Div my={3}>
          <CRTextInput label="Name" name="name" />
          <CRTimePicker
            label="Start"
            block
            name="start"
            placement="top"
            minInterval={15}
          />
          <CRTimePicker
            label="End"
            block
            name="end"
            placement="top"
            minInterval={15}
          />
        </Div>
      </Form>
    </CRModal>
  );
}

export default NewEvent;
