import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import {
  CRModal,
  CRNumberInput,
  CRSelectInput,
  CRRadio,
  Div,
} from 'components';
import { useDentalDiagnosisDefinition } from 'hooks';

const model = Schema.Model({});

const options = [
  {
    value: 'Root',
    name: 'Root',
  },
  {
    value: 'Neck',
    name: 'Neck',
  },
  {
    value: 'Crown',
    name: 'Crown',
  },
];
const DepthTypes = {
  Root: [
    { id: 'Root Canal', name: 'Root Canal' },
    { id: 'Bone', name: 'Bone' },
    { id: 'Cement', name: 'Cement' },
    { id: 'Nerve', name: 'Nerve' },
  ],
  Neck: [
    { id: 'Bone', name: 'Bone' },
    { id: 'Cement', name: 'Cement' },
    { id: 'Nerve', name: 'Nerve' },
  ],
  Crown: [
    { id: 'Enamal', name: 'Enamal' },
    { id: 'Dentin', name: 'Dentin' },
    { id: 'Pulp Cavity', name: 'Pulp Cavity' },
  ],
};
function NewDiagnosis({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  doctors,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add Diagnosis' : 'Delete Diagnosis '),
    [type]
  );
  const { dentalDiagnosissDefinition } = useDentalDiagnosisDefinition({});
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'create' ? (
          <>
            <CRNumberInput
              label="Tooth Number"
              name="toothNumber"
              placeholder="Type Tooth Number"
              disabled
              block
            />
            <CRNumberInput
              label="Tooth Part Number"
              name="toothPartNumber"
              placeholder="Type Tooth Part Number"
              disabled
              block
            />
            <CRRadio name="depthType" options={options} />
            <CRSelectInput
              label="Depth"
              name="depth"
              block
              data={DepthTypes[formValue.depthType]}
              placement="auto"
            />
            <CRSelectInput
              label="Diagnosis"
              name="diagnosisId"
              block
              data={dentalDiagnosissDefinition}
              placement="auto"
            />
            <CRSelectInput
              label="Doctor"
              name="doctorId"
              block
              data={doctors}
              placement="auto"
            />
          </>
        ) : (
          <Div>Are you sure that you want to delete this diagnosis</Div>
        )}
      </Form>
    </CRModal>
  );
}

NewDiagnosis.defaultProps = {
  type: 'create',
};

export default NewDiagnosis;
