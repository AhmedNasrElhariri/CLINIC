import React, { useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';
import { Div, CRButton, CRTextInput } from 'components';
import NewSessionDefinition from './new-session-definition';
import ListSessionsDefinition from './list-sessions-definition';
import { useForm, useSessionDefinition } from 'hooks';
import { Can } from 'components/user/can';
import { useModal } from 'hooks';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { Form } from 'rsuite';

const initValue = {
  name: '',
  price: 0,
  duration: 5,
  followUp: false,
  timer: 0,
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Session name is required'),
  price: NumberType().isRequired('price is required'),
});

const SessionDefinition = () => {
  const { visible, open, close } = useModal();
  const [filter, setFilter] = useState({ name: '' });
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
      const session = R.pick(['id', 'name', 'price', 'duration', 'followUp'])(
        data
      );
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
  const updatedSessionDefinition = useMemo(
    () =>
      sessionsDefinition.filter(s =>
        s?.name.toUpperCase().includes(filter?.name.toUpperCase())
      ),
    [sessionsDefinition, filter]
  );
  return (
    <>
      <Div display="flex" flexDirection="row-reverse" m={2}>
        <Can I="Create" an="SessionDefinition">
          <CRButton
            variant="primary"
            onClick={handleClickCreate}
            ml={2}
            mt="10px"
          >
            {t('addNewSessionDefinition')}+
          </CRButton>
        </Can>
        <Form formValue={filter} onChange={setFilter}>
          <CRTextInput name="name" placeholder="Search" />
        </Form>
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
        sessions={updatedSessionDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default SessionDefinition;
