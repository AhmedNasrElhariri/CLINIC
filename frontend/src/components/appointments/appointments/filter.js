import React from 'react';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { appointmentTypes, appointmentStatus } from 'services/appointment';
import { CRTextInput, CRSelectInput, CRDateRangePicker } from 'components';
import { useSessionDefinition } from 'hooks';

const FilterContainer = ({ children }) => (
  <div>{children}</div>
);

export default function AppointmentsFilter({ formValue, onChange }) {
  const { t } = useTranslation();
  const { sessionsDefinition } = useSessionDefinition({});
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
          label={t('range')}
          placeholder={t('timeframe')}
          block
        />
      </FilterContainer>
      <FilterContainer>
        <CRTextInput name="patient" label={t('nameOrPhoneNo')} />
      </FilterContainer>
      <FilterContainer>
        <CRSelectInput
          name="type"
          label={t('type')}
          block
          data={appointmentTypes}
        />
      </FilterContainer>
    </Form>
  );
}
