import React, { useMemo } from 'react';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRRadio, CRBrancheTree } from 'components';
import { Form } from 'rsuite';

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
  {
    value: 'Suppository',
    name: 'Suppository',
  },
  {
    value: 'Gil',
    name: 'Gil',
  },
];

function NewMedicine({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Medicine' : 'Edit Medicine '),
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
      <Form  formValue={formValue} onChange={onChange} fluid>
        <CRTextInput
          label="Medicine Name"
          name="name"
          placeholder="Type Name"
          block
        />
        <CRTextInput
          label="Concentration"
          name="concentration"
          placeholder="Type Concentration"
          block
        />
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={ACTIONS.View_Medicine}
        />
        <CRRadio label="Medicine Form" name="form" options={options} />
      </Form>
    </CRModal>
  );
}

NewMedicine.defaultProps = {
  type: 'create',
};

export default NewMedicine;
