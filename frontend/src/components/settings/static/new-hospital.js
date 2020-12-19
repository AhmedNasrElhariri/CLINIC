import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRTextArea } from 'components';

const model = Schema.Model({});

function NewHospital({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Hospital' : 'Edit Hospital'),
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
        <CRTextInput label="Name" name="name" block />
        <CRTextInput label="Phone No" name="phoneNo" block />
        <CRTextArea label="Address" name="address" block />
      </Form>
    </CRModal>
  );
}

NewHospital.defaultProps = {
  type: 'create',
};

export default NewHospital;
