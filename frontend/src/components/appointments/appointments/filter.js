import React from 'react';
import { Form, Row, Col } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { appointmentTypes, appointmentStatus } from 'services/appointment';
import { CRTextInput, CRSelectInput, CRDateRangePicker } from 'components';

function AppointmentsFilter({ formValue, onChange }) {
  const { t } = useTranslation();
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={6}>
          <CRSelectInput
            name="status"
            label={t('status')}
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
            label={t('range')}
            placeholder="Timeframe"
            block
          />
        </Col>
        <Col xs={6}>
          <CRTextInput name="patient" label={t('nameOrPhoneNo')} />
        </Col>
        <Col xs={6}>
          <CRSelectInput
            name="type"
            label={t('type')}
            block
            data={appointmentTypes}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
