import React from 'react';
import { CRSelectInput, Div } from 'components';
import { Form } from 'rsuite';
import { mapArrWithIdsToChoices } from 'utils/misc';

export default function CalendarFilter({ formValue, onChange, doctors }) {
  return (
    <Div my={2}>
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRSelectInput
          name="doctor"
          block
          cleanable={true}
          searchable={true}
          data={mapArrWithIdsToChoices(doctors)}
        />
      </Form>
    </Div>
  );
}
