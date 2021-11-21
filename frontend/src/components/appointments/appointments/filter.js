import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { appointmentTypes, appointmentStatus } from 'services/appointment';
import { CRTextInput, CRSelectInput, CRDateRangePicker } from 'components';

function AppointmentsFilter({ formValue, onChange }) {
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={6}>
          <CRSelectInput
            name="status"
            label="Status"
            block
            data={appointmentStatus}
            onChange={val =>
              val == null
                ? onChange({ ...formValue, status: 'Scheduled' })
                : onChange({ ...formValue, status: val })
            }
          />
        </Col>
        <Col xs={6}>
          <CRDateRangePicker
            name="date"
            label="Range"
            placeholder="Timeframe"
            block
          />
        </Col>
        <Col xs={6}>
          <CRTextInput name="patient" label="Name / phoneNo" />
        </Col>
        <Col xs={6}>
          <CRSelectInput
            name="type"
            label="Type"
            block
            data={appointmentTypes}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
