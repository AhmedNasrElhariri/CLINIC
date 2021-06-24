import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import {
  CRModal,
  CRNumberInput,
  CRTextInput,
  CRBrancheTree,
} from 'components';
const model = Schema.Model({});
function NewSessionDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New Session Definition'
        : 'Edit Session Definition ',
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
        <CRTextInput label="Name" name="name" placeholder="Type Name" block />
        <CRNumberInput
          label="Price"
          name="price"
          placeholder="Type Price"
          block
        />
        <CRBrancheTree formValue={formValue} onChange={onChange} action={ACTIONS.Create_Session}/>
      </Form>
    </CRModal>
  );
}

NewSessionDefinition.defaultProps = {
  type: 'create',
};

export default NewSessionDefinition;
