import React, { useMemo } from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';

import { CRModal, CRSelectInput } from 'components';

const model = Schema.Model({});

function NewAssign({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  users,
  roles,
}) {
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
          name="roleId"
          placeholder="Permission Roles"
          cleanable={true}
          accepter={SelectPicker}
          data={roles}
          labelKey="name"
          valueKey="id"
          virtualized={false}
          block
        />
        <CRSelectInput
          name="userId"
          placeholder="Users"
          cleanable={true}
          accepter={SelectPicker}
          labelKey="name"
          valueKey="id"
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
  roles: [],
};

export default NewAssign;
