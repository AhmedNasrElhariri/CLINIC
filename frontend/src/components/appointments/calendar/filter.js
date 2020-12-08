import React from 'react';
import { CRSelectInput, Div } from 'components';
import { Form } from 'rsuite';

const mapDoctorsToChoices = arr =>
  arr.map((currentValue, i) => ({
    label: currentValue.name,
    value: currentValue.id,
  }));

export default function CalendarFilter({ data }) {
  return (
    <Div width="30%">
      <Form fluid>
        <CRSelectInput
          name="type"
          block
          cleanable={true}
          searchable={true}
          data={mapDoctorsToChoices(data)}
        />
      </Form>
    </Div>
  );
}
