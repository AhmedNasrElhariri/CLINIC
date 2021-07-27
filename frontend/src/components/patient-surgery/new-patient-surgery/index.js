import React, { useMemo ,useState} from 'react';
import { Form, Schema } from 'rsuite';

import {
  CRModal,
  CRSelectInput,
  CRDatePicker,
  CRNumberInput,
} from 'components';
import { useHospitals, useSurgeries, usePatients } from 'hooks';

const model = Schema.Model({});

const NewPatientSurgery = ({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
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
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRSelectInput
          label="Patient"
          name="patientId"
          data={searchedPatients}
          onSearch={v => setPatientSearchValue(v)}
          block
        />
        <CRSelectInput
          label="Surgery"
          name="surgeryId"
          data={surgeries}
          block
        />
        <CRSelectInput
          label="Hospital"
          name="hospitalId"
          data={hospitals}
          block
        />
        <CRDatePicker name="date" label="Date" block />
        <CRNumberInput label="Fees" name="fees" block />
        <CRNumberInput label="Hospital fees" name="hospitalFees" block />
      </Form>
    </CRModal>
  );
};

NewPatientSurgery.defaultProps = {
  type: 'create',
};

export default NewPatientSurgery;
