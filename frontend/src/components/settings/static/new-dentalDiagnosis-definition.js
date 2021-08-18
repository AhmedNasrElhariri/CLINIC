import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

const model = Schema.Model({});

function NewDentalDiagnosisDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Dental Diagnosis' : 'Edit Dental Diagnosis '),
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
        <CRTextInput
          label="Dental Diagnosis Name"
          name="name"
          placeholder="Type Dental Diagnosis"
          block
        />
      </Form>
    </CRModal>
  );
}

NewDentalDiagnosisDefinition.defaultProps = {
  type: 'create',
};

export default NewDentalDiagnosisDefinition;
