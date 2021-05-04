import React from 'react';

import {
  CRModal,
  Div,
  CRTextInput,
  CRTimePicker,
  CRDatePicker,
} from 'components';
import { Form } from 'rsuite';
import { MIN_EVENT_DURATION } from 'utils/constants';
import { isDateBefore } from 'utils/date';

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
          <CRDatePicker
            label="Start Date"
            name="startDate"
            block
          />
          <CRTimePicker
            label="Start Time"
            block
            name="startTime"
            minInterval={MIN_EVENT_DURATION}
          />
          <CRDatePicker
            label="End Date"
            name="endDate"
            disabledDate={date => isDateBefore(date, formValue.startDate)}
            block
          />
          <CRTimePicker
            label="End Time"
            block
            name="endTime"
            minInterval={MIN_EVENT_DURATION}
          />
        </Div>
      </Form>
    </CRModal>
  );
}

export default NewEvent;
