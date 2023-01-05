import { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRNumberInput, CRTextInput, CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';

export default function EditableDoctorFees({
  show,
  onCancel,
  onOk,
  formValue,
  onChange,
  type,
  users,
  sessionsDefinition,
}) {
  const { t } = useTranslation();
  const header = useMemo(() => {
    if (type === 'editFees') {
      return t('editFees');
    } else if (type === 'addNewFees') {
      return t('addNewFees');
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
        {type === 'addNewFees' && (
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
          </>
        )}
        <CRTextInput name="name" label={t('name')} block />
        <CRNumberInput name="amount" label={t('amount')} block />
      </Form>
    </CRModal>
  );
}

EditableDoctorFees.propTypes = {};

EditableDoctorFees.defaultProps = {
  specialties: [],
};
