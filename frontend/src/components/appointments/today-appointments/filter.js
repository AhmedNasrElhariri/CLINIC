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
            cleanable={true}
            searchable={true}
            data={branches}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="doctor"
            label="Doctor"
            block
            cleanable={true}
            searchable={true}
            data={doctors}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="specialty"
            label="Specialty"
            block
            cleanable={true}
            searchable={true}
            data={specialties}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
