import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewSessionDefinition from './new-session-definition';
import ListSessionsDefinition from './list-sessions-definition';
import { useForm, useSessionDefinition } from 'hooks';
import { Can } from 'components/user/can';
import { useModal } from 'hooks';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initValue = {
  name: '',
  price: 0,
  duration: 5,
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Session name is required'),
  price: NumberType().isRequired('price is required'),
});

const SessionDefinition = () => {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const {
    formValue,
    setFormValue,
    type,
    setType,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue,
    model,
  });
  const {
    addSessionDefinition,
    sessionsDefinition,
    editSessionDefinition,
    loading,
  } = useSessionDefinition({
    onCreate: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setShow(false);
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
    if (type === 'create') {
      addSessionDefinition({
        variables: {
          sessionDefinition: {
            ...formValue,
            price: parseFloat(formValue.price),
          },
        },
      });
    } else {
      editSessionDefinition({
        variables: {
          sessionDefinition: {
            ...formValue,
            price: parseFloat(formValue.price),
          },
        },
      });
    }
  }, [addSessionDefinition, editSessionDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <Can I="Create" an="SessionDefinition">
          <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
            {t('addNewSessionDefinition')}+
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
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
        loading={loading}
      />
      <ListSessionsDefinition
        sessions={sessionsDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default SessionDefinition;
