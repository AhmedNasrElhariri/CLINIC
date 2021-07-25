import React, { useCallback, useState } from 'react';

import { Div, CRButton, RolePermissions } from 'components';
import NewAssign from './new-assign';
import ListAssigns from './list-assign';

import { useForm, usePermissions, useModal } from 'hooks';

const initValue = { roleId: null, userId: null };

function Assign() {
  const { visible, open, close } = useModal();
  const [role, setRole] = useState(null);
  const {
    visible: assignPermissions,
    open: openPermissions,
    close: closePermissions,
  } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { users, roles, assignRoleToUser, deleteRoleToUser } = usePermissions({
    onAssignRoleToUser: close,
    onDeleteRoleToUser: close,
  });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  console.log(formValue);
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      assignRoleToUser(formValue);
    } else {
      console.log(formValue,'formValue');
      deleteRoleToUser(formValue);
    }
  }, [assignRoleToUser, deleteRoleToUser, formValue]);

  const handleEdit = useCallback(
    index => {
      setRole(roles[index]);
      openPermissions();
    },
    [openPermissions, roles]
  );
  const handleDelete = useCallback(
    index => {
      setRole(roles[index]);
      setType('change');
      setFormValue(initValue);
      open();
    },
    [open, setFormValue, setType, roles]
  );
  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={openPermissions} mr={1}>
          Create
        </CRButton>
        <CRButton variant="primary" onClick={handleClickCreate}>
          Assign
        </CRButton>
      </Div>
      {assignPermissions && (
        <RolePermissions
          show={true}
          onClose={closePermissions}
          onCreateOrUpdate={closePermissions}
          defaultFormValue={role}
        />
      )}
      <NewAssign
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        users={users}
        roles={roles}
        role={role}
      />
      <ListAssigns data={roles} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}

export default Assign;
