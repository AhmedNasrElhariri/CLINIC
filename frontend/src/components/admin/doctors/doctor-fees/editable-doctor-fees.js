import { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRNumberInput,
  CRTextInput,
  CRSelectInput,
  CRDatePicker,
} from 'components';
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
  }, [type, t]);
  const updatedSessions = useMemo(
    () =>
      sessionsDefinition.map(s => {
        return { id: s, name: s.name };
      }),
    [sessionsDefinition]
  );
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
              name="session"
              label={t('session')}
              labelKey="name"
              valueKey="id"
              block
              data={updatedSessions}
            />
          </>
        )}
        <CRTextInput name="name" label={t('name')} block />
        <CRNumberInput name="amount" label={t('amount')} block float />
        <CRDatePicker label="Date" name="date" block></CRDatePicker>
        {type === 'editFees' && (
          <>
            <CRNumberInput name="totalPrice" label={t('sessionPrice')} block />
            <CRNumberInput name="cost" label={t('cost')} block />
          </>
        )}
      </Form>
    </CRModal>
  );
}

EditableDoctorFees.propTypes = {};

EditableDoctorFees.defaultProps = {
  specialties: [],
};
