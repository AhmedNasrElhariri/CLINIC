import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewRoomDefinition from './new-room-definition';
import ListRoomsDefinition from './list-rooms-definition';
import { useForm, useRoomDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const initValue = { name: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Room is required'),
});

const RoomDefinition = () => {
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
  const { addRoomDefinition, roomsDefinition, editRoomDefinition, loading } =
    useRoomDefinition({
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
      const Room = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(Room);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addRoomDefinition({
        variables: {
          roomDefinition: formValue,
        },
      });
    } else {
      editRoomDefinition({
        variables: {
          roomDefinition: formValue,
        },
      });
    }
  }, [addRoomDefinition, editRoomDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          {t('addNewRoom')}+
        </CRButton>
      </Div>
      <NewRoomDefinition
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
      <ListRoomsDefinition rooms={roomsDefinition} onEdit={handleClickEdit} />
    </>
  );
};

export default RoomDefinition;
