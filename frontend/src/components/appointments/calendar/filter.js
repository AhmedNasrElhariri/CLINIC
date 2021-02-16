import React from 'react';
import { CRSelectInput, Div } from 'components';
import { Form } from 'rsuite';
import { mapArrWithIdsToChoices } from 'utils/misc';

export default function CalendarFilter({ formValue, onChange }) {
  const doctors = [
    {
      id: 1,
      name: 'Ahmed',
    },
    {
      id: 2,
      name: 'Mohamed',
    },
  ];
  
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
