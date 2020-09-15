import React from 'react';

import { CRModal, Div, CRTextInput, CRTimePicker } from 'components';
import { Form } from 'rsuite';
import { MIN_EVENT_DURATION } from 'utils/constants';

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
            minInterval={MIN_EVENT_DURATION}
          />
          <CRTimePicker
            label="End"
            block
            name="end"
            placement="top"
            minInterval={MIN_EVENT_DURATION}
          />
        </Div>
      </Form>
    </CRModal>
  );
}

export default NewEvent;
