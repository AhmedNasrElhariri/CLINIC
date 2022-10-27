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
    <Form
      formValue={formValue}
      onChange={onChange}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      fluid
    >
      <CRSelectInput
        name="surgery"
        label={t('surgery')}
        data={surgeries}
        block
      />
      <CRSelectInput
        name="hospital"
        label={t('hospital')}
        block
        data={hospitals}
      />
      <CRSelectInput
        label={t('patient')}
        name="patientId"
        onSearch={v => setPatientSearchValue(v)}
        placeholder="Name / Phone no"
        block
        data={searchedPatients}
      />
      <CRDateRangePicker
        name="time"
        label={t('time')}
        placeholder={t('timeframe')}
        block
        placement="auto"
      />
    </Form>
  );
}

export default PatientSurgeryFilter;
