import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewSessionDefinition from './new-session-definition';
import ListSessionsDefinition from './list-sessions-definition';
import { useForm, useSessionDefinition } from 'hooks';
import { Can } from 'components/user/can';
import { useModal } from 'hooks';
import { Schema } from 'rsuite';
import { Validate } from 'services/form';

const initValue = {
  name: '',
  price: 0,
  duration: 5,
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Session name is required'),
  price: NumberType().range(1, 1000000).isRequired('price is required'),
});

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
      const session = R.pick(['id', 'name', 'price', 'duration'])(data);
      setType('edit');
      setFormValue(session);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create' && Validate(model, formValue)) {
      addSessionDefinition({
        variables: {
          sessionDefinition: formValue,
        },
      });
    } else if (type === 'edit' && Validate(model, formValue)) {
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
        <Can I="Create" an="SessionDefinition">
          <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
            Add New Session Definition+
          </CRButton>
        </Can>
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
