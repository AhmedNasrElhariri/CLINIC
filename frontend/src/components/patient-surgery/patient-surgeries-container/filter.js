import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { CRSelectInput } from 'components';
import { useHospitals, useSurgeries } from 'hooks';

function PatientSurgeryFilter({ formValue, onChange }) {
  const { hospitals } = useHospitals();
  const { surgeries } = useSurgeries();

  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRSelectInput
            name="surgery"
            label="Surgery"
            cleanable={true}
            searchable={true}
            data={surgeries}
            block
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="hospital"
            label="Hospital"
            block
            cleanable={true}
            searchable={true}
            data={hospitals}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default PatientSurgeryFilter;
