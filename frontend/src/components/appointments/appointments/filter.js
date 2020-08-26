import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { appointmentTypes } from 'services/appointment';
import { CRTextInput, CRSelectInput, CRDateRangePicker } from 'components';

function Appointments({ formValue, onChange }) {
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRDateRangePicker
            name="date"
            label="Range"
            placeholder="Timeframe"
            block
          />
        </Col>
        <Col xs={8}>
          <CRTextInput name="name" label="Name" />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="type"
            label="Type"
            block
            cleanable={true}
            searchable={true}
            data={appointmentTypes}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Appointments;
