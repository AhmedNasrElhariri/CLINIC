import React, { useCallback } from 'react';

import { Div, CRButton, RolePermissions } from 'components';
import NewAssign from './new-assign';
import ListAssigns from './list-assign';

import { useForm, usePermissions, useModal } from 'hooks';

const initValue = { roleId: null, userId: null };

function Assign() {
  const { visible, open, close } = useModal();
  const {
    visible: assignPermissions,
    open: openPermissions,
    close: closePermissions,
  } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { users, roles, assignRoleToUser } = usePermissions({
    onAssignRoleToUser: close,
  });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleAdd = useCallback(() => {
    assignRoleToUser(formValue);
  }, [assignRoleToUser, formValue]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={openPermissions}>
          Create
        </CRButton>
        <CRButton variant="primary" onClick={handleClickCreate}>
          Assign
        </CRButton>
      </Div>
      <RolePermissions
        show={assignPermissions}
        onClose={closePermissions}
        onCreate={closePermissions}
      />
      <NewAssign
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        users={users}
        roles={roles}
      />
      <ListAssigns data={roles} />
    </>
  );
}

export default Assign;
