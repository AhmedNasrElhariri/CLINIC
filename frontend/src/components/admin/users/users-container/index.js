import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import { NewUser, MainContainer, CRButton, Users } from 'components';
import { usePermissions, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        title={t('users')}
        nobody
        more={
          <CRButton onClick={handleClickCreate} variant="primary">
            {t('newUser')}
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
