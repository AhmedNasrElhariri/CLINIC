import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { CRSelectInput } from 'components';
import { doctorsTypes, specializationsTypes } from 'services/appointment';

function AppointmentsFilter({ formValue, onChange, doctors, specializations }) {
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={12}>
          <CRSelectInput
            name="doctor"
            label="Doctor"
            block
            cleanable={true}
            searchable={true}
            data={doctorsTypes(doctors)}
          />
        </Col>
        <Col xs={12}>
          <CRSelectInput
            name="specialization"
            label="Specialization"
            block
            cleanable={true}
            searchable={true}
            data={specializationsTypes(specializations)}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
