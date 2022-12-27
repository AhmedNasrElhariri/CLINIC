import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRRadio, CRModal, H3 } from 'components';
import { CRSelectInput } from 'components/widgets';

import { useTranslation } from 'react-i18next';

const feesCalTypes = [
  { name: 'Percentage', value: 'percentage' },
  { name: 'Fixed', value: 'fixed' },
];
const feesCalMethods = [
  { name: 'Before', value: 'before' },
  { name: 'After', value: 'after' },
];

export default function NewUser({
  show,
  onCancel,
  onCreate,
  onOk,
  formValue,
  onChange,
  type,
  sessionsDefinition,
}) {
  const { t } = useTranslation();
  const header = useMemo(() => {
    if (type === 'newSession') {
      return t('newSession');
    } else {
      return t('deleteSession');
    }
  }, [type]);
  return (
    <CRModal
      show={show}
      header={header}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onOk(formValue)}
    >
      <Form fluid formValue={formValue} onChange={onChange}>
        {type === 'delete' ? (
          <H3>Are you sure that you want delete the session to doctor?</H3>
        ) : (
          <>
            <CRSelectInput
              name="sessionId"
              label={t('session')}
              labelKey="name"
              valueKey="id"
              block
              data={sessionsDefinition}
            />
            <CRRadio
              options={feesCalMethods}
              name="feesCalculationMethod"
              label="fees Calculation Method"
            />
            <CRRadio
              options={feesCalTypes}
              name="feesCalculationType"
              label="fees Calculation Type"
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewUser.propTypes = {};

NewUser.defaultProps = {
  specialties: [],
};
