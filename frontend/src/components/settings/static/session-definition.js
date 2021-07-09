import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewSessionDefinition from './new-session-definition';
import ListSessionsDefinition from './list-sessions-definition';
import { useForm, useSessionDefinition } from 'hooks';

import { useModal } from 'hooks';

const initValue = {
  name: '',
  price: 0,
  duration:5,
};

const SessionDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addSessionDefinition, sessionsDefinition, editSessionDefinition } =
    useSessionDefinition({
      onCreate: () => {
        close();
        setFormValue(initValue);
      },
      onEdit: () => {
        close();
        setFormValue(initValue);
      },
    });

  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  const handleClickEdit = useCallback(
    data => {
      const session = R.pick(['id', 'name', 'price','duration'])(data);
      setType('edit');
      setFormValue(session);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addSessionDefinition({
        variables: {
          sessionDefinition: formValue,
        },
      });
    } else {
      editSessionDefinition({
        variables: {
          sessionDefinition: formValue,
        },
      });
    }
  }, [addSessionDefinition, editSessionDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Session Definition+
        </CRButton>
      </Div>
      <NewSessionDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListSessionsDefinition
        sessions={sessionsDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default SessionDefinition;
