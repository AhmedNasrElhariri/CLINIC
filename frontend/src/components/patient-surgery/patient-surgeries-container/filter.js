import React, { useState } from 'react';
import { Form, Row, Col } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { CRSelectInput, CRDateRangePicker, Div } from 'components';
import { useHospitals, useSurgeries, usePatients } from 'hooks';

function PatientSurgeryFilter({ formValue, onChange }) {
  const { hospitals } = useHospitals();
  const { surgeries } = useSurgeries();
  const { t } = useTranslation();
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
            label={t('surgery')}
            data={surgeries}
            block
          />
        </Col>
        <Col xs={6}>
          <CRSelectInput
            name="hospital"
            label={t('hospital')}
            block
            data={hospitals}
          />
        </Col>
        <Col xs={6}>
          <CRSelectInput
            label={t('patient')}
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
            label={t('time')}
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
