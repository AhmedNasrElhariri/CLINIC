import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { CRSelectInput } from 'components';

function AppointmentsFilter({
  formValue,
  onChange,
  branches,
  doctors,
  specialties,
}) {
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRSelectInput
            name="branch"
            label="Branch"
            block
            data={branches}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="doctor"
            label="Doctor"
            block
            data={doctors}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="specialty"
            label="Specialty"
            block
            data={specialties}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
