import { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRNumberInput,
  CRTextInput,
} from 'components';
import { useTranslation } from 'react-i18next';

export default function EditableDoctorFees({
  show,
  onCancel,
  onCreate,
  onOk,
  formValue,
  onChange,
  type,
}) {
  const { t } = useTranslation();
  const header = useMemo(() => {
    if (type === 'editFees') {
      return t('editFees');
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
