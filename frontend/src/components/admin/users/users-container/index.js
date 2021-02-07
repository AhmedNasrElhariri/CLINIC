import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { NewUser, MainContainer, CRButton, Users } from 'components';

export default function UsersContainer() {
  const [visible, setVisible] = useState(false);
  const data = JSON.parse(localStorage.getItem('users')) || [];

  const create = useCallback(
    user => {
      let users = [
        ...data,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: user.name,
          password: user.password,
          email: user.email,
          type: user.type,
          specialty: user.specialty,
          notes: user.notes,
        },
      ];
      users = JSON.stringify(users);
      localStorage.setItem('users', users);
      Alert.success('User has been created successfully');
      setVisible(false);
    },
    [data]
  );

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const onCreate = useCallback(user => create(user), [create]);

  const users = R.propOr(
    [],
    'users'
  )({
    users: data,
  });

  return (
    <>
      <MainContainer
        title="Users"
        nobody
        more={
          <CRButton onClick={showModal} primary small>
            New User
          </CRButton>
        }
      ></MainContainer>
      <NewUser
        onCreate={onCreate}
        show={visible}
        onHide={hideModal}
        onCancel={hideModal}
      />
      <Users users={users} />
    </>
  );
}

UsersContainer.propTypes = {};

UsersContainer.defaultProps = {};
