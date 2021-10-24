import React, { useMemo, useState } from 'react';
import { Form, Schema } from 'rsuite';

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
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const header = useMemo(
    () => (type === 'create' ? 'Add New Surgery' : 'Edit Surgery'),
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        setShow(true);
        validate && onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
      loading={loading}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRSelectInput
          label="Patient"
          name="patientId"
          errorMessage={
            show && checkResult['patientId'].hasError
              ? checkResult['patientId'].errorMessage
              : ''
          }
          data={searchedPatients}
          onSearch={v => setPatientSearchValue(v)}
          block
        />
        <CRSelectInput
          label="Surgery"
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
          label="Hospital"
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
          label="Date"
          block
          errorMessage={
            show && checkResult['date'].hasError
              ? checkResult['date'].errorMessage
              : ''
          }
        />
        <CRTimePicker
          label="Time of Admision"
          block
          name="time"
          startHour={8}
          onSelectTrigger
        />
        <CRSelectInput
          label="Anesthesia"
          name="anesthesia"
          data={AnesthesiaData}
          block
        />
        <CRTextInput
          label="Anesthesia Doctor Name"
          name="anesthesiaDoctorName"
          placeholder="Type Anesthesia Doctor Name"
          block
        />
        <CRNumberInput label="Doctor Fees" name="fees" block />
        <CRNumberInput label="Assistant Fees" name="assistantFees" block />
        <CRNumberInput label="Anesthesia Fees" name="anesthesiaFees" block />
        <CRNumberInput label="Hospital fees" name="hospitalFees" block />
        <CRNumberInput label="others" name="others" block />
      </Form>
    </CRModal>
  );
};

NewPatientSurgery.defaultProps = {
  type: 'create',
};

export default NewPatientSurgery;
