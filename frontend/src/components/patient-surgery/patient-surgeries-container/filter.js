import React, { useState } from 'react';
import { Form, Row, Col } from 'rsuite';

import { CRSelectInput, CRDateRangePicker, Div } from 'components';
import { useHospitals, useSurgeries, usePatients } from 'hooks';

function PatientSurgeryFilter({ formValue, onChange }) {
  const { hospitals } = useHospitals();
  const { surgeries } = useSurgeries();
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={6}>
          <CRSelectInput
            name="surgery"
            label="Surgery"
            data={surgeries}
            block
          />
        </Col>
        <Col xs={6}>
          <CRSelectInput
            name="hospital"
            label="Hospital"
            block
            data={hospitals}
          />
        </Col>
        <Col xs={6}>
          <CRSelectInput
            label="Patient"
            name="patientId"
            onSearch={v => setPatientSearchValue(v)}
            placeholder="Name / Phone no"
            block
            data={searchedPatients}
          />
        </Col>
        <Col xs={6}>
          <CRDateRangePicker
            name="time"
            label="Time from to"
            placeholder="Timeframe"
            block
            placement="left"
          />
        </Col>
      </Row>
    </Form>
  );
}

export default PatientSurgeryFilter;
