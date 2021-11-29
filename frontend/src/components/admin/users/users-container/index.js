import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import { NewUser, MainContainer, CRButton, Users } from 'components';
import { usePermissions, useModal } from 'hooks';

const initialValues = {
  name: '',
  email: '',
  password: '',
  position: '',
  allowedViews: [],
};
export default function UsersContainer() {
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialValues);
  const [type, setType] = useState('');
  const { users, createUser, editUser } = usePermissions({
    onCreateUser: close,
    onEditUser: close,
  });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initialValues);
    open();
  }, [open, setType, setFormValue]);
  const handleClickEdit = useCallback(
    data => {
      const user = R.pick(['id', 'name', 'email', 'allowedViews'])(data);
      setType('edit');
      setFormValue(user);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      createUser(formValue);
    } else {
      editUser(formValue);
    }
  }, [createUser, editUser, formValue, type]);
  return (
    <>
      <MainContainer
        title="Users"
        nobody
        more={
          <CRButton onClick={handleClickCreate} variant="primary">
            New User
          </CRButton>
        }
      ></MainContainer>
      <NewUser
        show={visible}
        onHide={close}
        onCancel={close}
        onOk={handleAdd}
        formValue={formValue}
        onChange={setFormValue}
        type={type}
      />
      <Users users={users} onEdit={handleClickEdit} />
    </>
  );
}

UsersContainer.propTypes = {};

UsersContainer.defaultProps = {};
