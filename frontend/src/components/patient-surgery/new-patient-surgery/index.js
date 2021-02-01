import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import {
  CRModal,
  CRSelectInput,
  CRDatePicker,
  CRNumberInput,
} from 'components';
import useFetchPatients from 'hooks/fetch-patients';
import useSurgeries from 'hooks/fetch-surgeries';
import useHospitals from 'hooks/fetch-hospitals';

const model = Schema.Model({});

const NewPatientSurgery = ({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) => {
  const { patients } = useFetchPatients();
  const { surgeries } = useSurgeries();
  const { hospitals } = useHospitals();
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
          labelKey="name"
          valueKey="id"
          name="patientId"
          data={patients || []}
          block
        />
        <CRSelectInput
          label="Surgery"
          labelKey="name"
          valueKey="id"
          name="surgeryId"
          data={surgeries}
          block
        />
        <CRSelectInput
          label="Hospital"
          labelKey="name"
          valueKey="id"
          name="hospitalId"
          data={hospitals}
          block
        />
        <CRDatePicker name="date" label="Date" placement="top" block />
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
