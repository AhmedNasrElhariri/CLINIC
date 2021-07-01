import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRBrancheTree } from 'components';

const model = Schema.Model({});

function NewSurgery({ formValue, onChange, type, visible, onOk, onClose }) {
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
        <CRTextInput label="Name" name="name" block />
        <CRBrancheTree formValue={formValue} onChange={onChange} action={ACTIONS.Create_Surgery}/>
      </Form>
    </CRModal>
  );
}

NewSurgery.defaultProps = {
  type: 'create',
};

export default NewSurgery;
