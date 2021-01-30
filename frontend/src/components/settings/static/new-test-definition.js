import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput  } from 'components';


const model = Schema.Model({});

function NewTestDefinition({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Test' : 'Edit Test '),
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
            <CRTextInput label="Test Name" name="testName" placeholder="Type Test" block />  
        </Form>
    </CRModal>
  );
}

NewTestDefinition.defaultProps = {
  type: 'create',
};

export default NewTestDefinition;
