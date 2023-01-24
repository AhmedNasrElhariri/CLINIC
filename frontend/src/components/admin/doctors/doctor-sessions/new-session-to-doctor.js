import { useMemo } from 'react';
import { Form, Toggle } from 'rsuite';
import {
  CRRadio,
  CRModal,
  H3,
  CRNumberInput,
  CRSelectInput,
  CRLabel,
  Div
} from 'components';
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
      return t('newSessionDefination');
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
          <H3>Are you sure that you want to delete this record?</H3>
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
              label={t("feesCalculationType")}
            />
            {formValue.feesCalculationType === 'percentage' && (
              <CRRadio
                options={feesCalMethods}
                name="feesCalculationMethod"
                label="fees Calculation Method"
              />
            )}
            <CRNumberInput name="fees" label={t('fees')} block />
            <Div mt="20px" display="flex">
              <CRLabel>External</CRLabel>
              <Toggle
                onChange={val => onChange({ ...formValue, referedDoctor: val })}
                checked={formValue?.referedDoctor}
                style={{margin:'5px 0px 0px 10px'}}
              />
            </Div>
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
