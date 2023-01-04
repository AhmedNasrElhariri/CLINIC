import { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRRadio, CRModal, H3, CRNumberInput, CRSelectInput } from 'components';
import { feesCalTypes, feesCalMethods } from 'utils/constants';

export default function NewSession({
  show,
  onCancel,
  onOk,
  formValue,
  onChange,
  type,
  sessionsDefinition,
  users,
  t,
}) {
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
              name="doctorId"
              label={t('doctor')}
              labelKey="name"
              valueKey="id"
              block
              data={users}
            />
            <CRSelectInput
              name="sessionId"
              label={t('session')}
              labelKey="name"
              valueKey="id"
              block
              data={sessionsDefinition}
            />
            <CRRadio
              options={feesCalTypes}
              name="feesCalculationType"
              label="fees Calculation Type"
            />
            {formValue.feesCalculationType === 'percentage' && (
              <CRRadio
                options={feesCalMethods}
                name="feesCalculationMethod"
                label="fees Calculation Method"
              />
            )}
            <CRNumberInput name="fees" label={t('fees')} block />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewSession.propTypes = {};

NewSession.defaultProps = {
  specialties: [],
};
