import React, { useMemo, useState } from 'react';
import { Form, Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';
import {
  CRModal,
  CRSelectInput,
  CRDatePicker,
  CRNumberInput,
  CRTimePicker,
  CRTextInput,
} from 'components';
import { useHospitals, useSurgeries, usePatients } from 'hooks';

const model = Schema.Model({});

const AnesthesiaData = [
  { id: 'General', name: 'General' },
  { id: 'Regional', name: 'Regional' },
  { id: 'Local', name: 'Local' },
];
const NewPatientSurgery = ({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
  loading,
}) => {
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { surgeries } = useSurgeries();
  const { hospitals } = useHospitals();
  const { t } = useTranslation();
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const header = useMemo(
    () => (type === 'create' ? t('addNewSurgery') : t('editSurgery')),
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
      loading={loading}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRSelectInput
          label={t('patient')}
          name="patientId"
          errorMessage={
            show && checkResult['patientId'].hasError
              ? checkResult['patientId'].errorMessage
              : ''
          }
          data={searchedPatients}
          onSearch={v => setPatientSearchValue(v)}
          block
          disabled={type === 'create' ? false : true}
        />

        <CRSelectInput
          label={t('surgery')}
          name="surgeryId"
          errorMessage={
            show && checkResult['surgeryId'].hasError
              ? checkResult['surgeryId'].errorMessage
              : ''
          }
          data={surgeries}
          block
        />
        <CRSelectInput
          label={t('hospital')}
          name="hospitalId"
          errorMessage={
            show && checkResult['hospitalId'].hasError
              ? checkResult['hospitalId'].errorMessage
              : ''
          }
          data={hospitals}
          block
        />
        <CRDatePicker
          name="date"
          label={t('date')}
          block
          errorMessage={
            show && checkResult['date'].hasError
              ? checkResult['date'].errorMessage
              : ''
          }
        />
        <CRTimePicker
          label={t('timeOfAdmision')}
          block
          name="time"
          startHour={8}
          onSelectTrigger
        />
        <CRSelectInput
          label={t('anesthesiaType')}
          name="anesthesia"
          data={AnesthesiaData}
          block
        />
        <CRTextInput
          label={t('anesthesiaDoctorName')}
          name="anesthesiaDoctorName"
          placeholder="Type Anesthesia Doctor Name"
          block
        />
        <CRNumberInput label={t('doctorFees')} name="fees" block />
        <CRNumberInput label={t('assistantFees')} name="assistantFees" block />
        <CRNumberInput
          label={t('anesthesiaFees')}
          name="anesthesiaFees"
          block
        />
        <CRNumberInput label={t('hospitalFees')} name="hospitalFees" block />
        <CRNumberInput label={t('others')} name="others" block />
      </Form>
    </CRModal>
  );
};

NewPatientSurgery.defaultProps = {
  type: 'create',
};

export default NewPatientSurgery;
