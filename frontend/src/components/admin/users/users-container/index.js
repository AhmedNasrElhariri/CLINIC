import React, { useCallback } from 'react';

import { NewUser, MainContainer, CRButton, Users } from 'components';
import { usePermissions, useModal } from 'hooks';
export default function UsersContainer() {
  const { visible, open, close } = useModal();

  const { users, createUser } = usePermissions({
    onCreateUser: close,
  });

  const handleCreate = useCallback(
    user => {
      createUser(user);
    },
    [createUser]
  );

  return (
    <>
      <MainContainer
        title="Users"
        nobody
        more={
          <CRButton onClick={open} variant="primary">
            New User
          </CRButton>
        }
      ></MainContainer>
      <NewUser
        onCreate={handleCreate}
        show={visible}
        onHide={close}
        onCancel={close}
      />
      <Users users={users} />
    </>
  );
}

UsersContainer.propTypes = {};

UsersContainer.defaultProps = {};
