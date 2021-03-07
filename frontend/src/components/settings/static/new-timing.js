import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

const model = Schema.Model({});

function NewTiming({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Timing' : 'Edit Timing '),
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
        <CRTextInput label="Timing Name" name="name" placeholder="Name" block />
        <CRTextInput
          label="English Print Value"
          name="englishPrintValue"
          placeholder="Print Value"
          block
        />
        <CRTextInput
          label="Arabic Print Value"
          name="arabicPrintValue"
          placeholder="Print Value"
          block
        />
      </Form>
    </CRModal>
  );
}

NewTiming.defaultProps = {
  type: 'create',
};

export default NewTiming;
