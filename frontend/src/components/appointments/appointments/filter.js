import React, { useState } from 'react';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { appointmentTypes, appointmentStatus } from 'services/appointment';
import { CRTextInput, CRSelectInput, CRDateRangePicker } from 'components';
import { useSessionDefinition } from 'hooks';

const FilterContainer = ({ children }) => <div>{children}</div>;

export default function AppointmentsFilter({ formValue, onChange }) {
  const { t } = useTranslation();
  const { sessionsDefinition } = useSessionDefinition({});
  const [patientInternalValue, setPatientInternalValue] = useState('');

  return (
    <Form
      formValue={formValue}
      onChange={onChange}
      fluid
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
    >
      <FilterContainer>
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
      </FilterContainer>
      <FilterContainer>
        <CRDateRangePicker
          name="date"
          placement="auto"
          label={t('range')}
          placeholder={t('timeframe')}
          block
        />
      </FilterContainer>
      <FilterContainer>
        <CRTextInput
          placeholder="Insert at leaset 6 numbers or 3 characters"
          label={t('nameOrPhoneNo')}
          value={patientInternalValue}
          onChange={value => {
            const pattern = /^(010|011|012|015)\d{3,}|[^0-9]{3,}/;
            if (pattern.test(value) || !value) {
              onChange({ ...formValue, patient: value });
            }
            setPatientInternalValue(value);
          }}
        />
      </FilterContainer>
      <FilterContainer>
        <CRSelectInput
          name="type"
          label={t('type')}
          valueKey="id"
          block
          data={sessionsDefinition}
        />
      </FilterContainer>
    </Form>
  );
}
