import React, { useMemo } from 'react';
import { Form, Schema , FormGroup, RadioGroup } from 'rsuite';

import { CRModal, CRTextInput , CRRadioButton } from 'components';
import Label from 'components/widgets/label';

const model = Schema.Model({});

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
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput label="Medicine Name" name="medicineName" placeholder="Type Name" block/>
        <CRTextInput label="Concentration" name="concentration" placeholder="Type Concentration" block />
        <Label>Medicine Form</Label>
        <RadioGroup inline name="medicineForm">
            <CRRadioButton value="tablets" label="Tablets"/>
            <CRRadioButton value="capsules" label="Capsules"/>
            <CRRadioButton value="syrup" label="Syrup"/>
            <CRRadioButton value="drops" label="Drops"/>
            <CRRadioButton value="cream" label="Cream/ointment"/>
            <CRRadioButton value="power" label="Power"/>
            <CRRadioButton value="amp" label="AMP"/>
            <CRRadioButton value="sachets" label="Sachets"/>
            <CRRadioButton value="vial" label="Vial"/>
        </RadioGroup>
      </Form>
    </CRModal>
  );
}

NewMedicine.defaultProps = {
  type: 'create',
};

export default NewMedicine;
