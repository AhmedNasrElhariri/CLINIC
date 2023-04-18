import React from 'react';
import { CRSelectInput, Div } from 'components';
import { Form } from 'rsuite';

export default function CalendarFilter({ formValue, onChange, doctors }) {
  return (
    <Div my={2}>
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRSelectInput
          name="doctorId"
          labelKey="name"
          valueKey="id"
          block
          data={doctors}
        />
      </Form>
    </Div>
  );
}
