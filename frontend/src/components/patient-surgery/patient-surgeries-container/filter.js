import React from 'react';
import { Form, Row, Col } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { CRSelectInput } from 'components';
import { useHospitals, useSurgeries } from 'hooks';

function PatientSurgeryFilter({ formValue, onChange }) {
  const { hospitals } = useHospitals();
  const { surgeries } = useSurgeries();
  const { t } = useTranslation();

  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRSelectInput
            name="surgery"
            label={t('surgery')}
            data={surgeries}
            block
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="hospital"
            label={t('hospital')}
            block
            data={hospitals}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default PatientSurgeryFilter;
