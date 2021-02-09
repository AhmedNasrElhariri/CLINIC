import React, { useMemo } from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';

import { CRModal, CRSelectInput } from 'components';


const model = Schema.Model({});

function NewAssign({ formValue, onChange, type, visible, onOk, onClose,users,fetchRoles }) {
  const header = useMemo(() => (type === 'create' ? 'New Assign' : ''), [type]);
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRSelectInput
          name="role"
          placeholder="Permission Roles"
          cleanable={true}
          accepter={SelectPicker}
          data={fetchRoles}
          labelKey="name"
          valueKey="name"
          virtualized={false}
          block
        />
        <CRSelectInput
          name="user"
          placeholder="Users"
          cleanable={true}
          accepter={SelectPicker}
          labelKey="name"
          valueKey="name"
          data={users}
          virtualized={false}
          block
        />
      </Form>
    </CRModal>
  );
}

NewAssign.defaultProps = {
  type: 'create',
};

export default NewAssign;
