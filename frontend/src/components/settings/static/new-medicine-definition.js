import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRRadio } from 'components';
const model = Schema.Model({});
const options = [
  {
    value: 'tablets',
    name: 'Tablets',
  },
  {
    value: 'capsules',
    name: 'Capsules',
  },
  {
    value: 'syrup',
    name: 'Syrup',
  },
  {
    value: 'drops',
    name: 'Drops',
  },
  {
    value: 'cream/ointment',
    name: 'Cream/ointment',
  },
  {
    value: 'power',
    name: 'Power',
  },
  {
    value: 'amp',
    name: 'AMP',
  },
  {
    value: 'sachets',
    name: 'Sachets',
  },
  {
    value: 'vial',
    name: 'Vial',
  },
];

function NewMedicine({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Medicine' : 'Edit Medicine '),
    [type]
  );
  console.log(formValue);
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput
          label="Medicine Name"
          name="medicineName"
          placeholder="Type Name"
          block
        />
        <CRTextInput
          label="Concentration"
          name="concentration"
          placeholder="Type Concentration"
          block
        />
        <CRRadio label="Medicine Form" name="medicineForm" options={options} />
      </Form>
    </CRModal>
  );
}

NewMedicine.defaultProps = {
  type: 'create',
};

export default NewMedicine;
