import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { CRSelectInput } from 'components';
import useHospitals from 'hooks/fetch-hospitals';
import useSurgeries from 'hooks/fetch-surgeries';

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
            labelKey="name"
            valueKey="id"
            block
            cleanable={true}
            searchable={true}
            data={surgeries}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="hospital"
            label="Hospital"
            labelKey="name"
            valueKey="id"
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
