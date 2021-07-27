import React, { useMemo,useEffect } from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';
import * as R from 'ramda';
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
  role,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'New Assign' : 'Delete Assign'),
    [type]
  );
  const updatedUsers = useMemo(() => R.propOr([], 'users')(role), [role]);
  useEffect(() => {
    const roleID = R.propOr([], 'id')(role);
    onChange({ ...formValue, roleId: roleID });
  }, [role]);
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'create' ? (
          <>
            <CRSelectInput
              name="roleId"
              placeholder="Permission Roles"
              data={roles}
              block
            />
            <CRSelectInput
              name="userId"
              placeholder="Users"
              data={users}
              block
            />
          </>
        ) : (
          <>
            <CRSelectInput
              name="roleId"
              placeholder="Permission Roles"
              data={roles}
              disabled
              block
            />
            <CRSelectInput
              name="userId"
              placeholder="Users"
              data={updatedUsers}
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewAssign.defaultProps = {
  type: 'create',
  roles: [],
};

export default NewAssign;
