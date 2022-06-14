import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewAppointmentTypeDefinition from './new-appointmentType-definition';
import ListAppointmentTypesDefinition from './list-appointmentTypes-definition';
import { useAppointmentTypesDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const initValue = {
  name: '',
  urgent: false,
};
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Appointment Type name is required'),
});

const AppointmentTypeDefinition = () => {
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
  } = useFrom({
    initValue,
    model,
  });
  const {
    addAppointmentTypeDefinition,
    appointmentTypesDefinitions,
    editAppointmentTypeDefinition,
    deleteAppointmentTypeDefinition,
    loading,
  } = useAppointmentTypesDefinition({
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
    onDelete: () => {
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
      const appointmentType = R.pick(['id', 'name', 'urgent'])(data);
      setType('edit');
      setFormValue(appointmentType);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const appointmentType = R.pick(['id', 'name', 'urgent'])(data);
      setType('delete');
      setFormValue(appointmentType);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addAppointmentTypeDefinition({
        variables: {
          appointmentTypeDefinition: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteAppointmentTypeDefinition({
        variables: {
          appointmentTypeDefinition: formValue,
          type: 'delete',
        },
      });
    } else {
      editAppointmentTypeDefinition({
        variables: {
          appointmentTypeDefinition: formValue,
          type: 'edit',
        },
      });
    }
  }, [
    addAppointmentTypeDefinition,
    editAppointmentTypeDefinition,
    deleteAppointmentTypeDefinition,
    formValue,
    type,
  ]);
  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          {t('addNewAppointmentType')}+
        </CRButton>
      </Div>
      <NewAppointmentTypeDefinition
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
      <ListAppointmentTypesDefinition
        appointmentTypes={appointmentTypesDefinitions}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default AppointmentTypeDefinition;
