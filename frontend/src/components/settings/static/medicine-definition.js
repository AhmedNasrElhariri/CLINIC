import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Schema } from 'rsuite';
import { Div, CRButton } from 'components';
import NewMedicineDefinition from './new-medicine-definition';
import ListMedicinesDefinition from './list-medicine-definition';
import { useMedicineDefinitions } from 'hooks';
import { useForm, useModal } from 'hooks';

const initValue = {
  name: '',
  concentration: '',
  form: '',
  branchId: null,
  specialtyId: null,
  userId: null,
};
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('medicine name is required'),
  concentration: StringType().isRequired('concentration name is required'),
  form: StringType().isRequired('form name is required'),
});

const MedicineDefinition = () => {
  const { visible, open, close } = useModal();
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
    addMedicineDefinition,
    medicineDefinitions,
    editMedicineDefinition,
    deleteMedicineDefinition,
  } = useMedicineDefinitions({
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
      const medicine = R.pick(['id', 'name', 'concentration', 'form'])(data);
      setType('edit');
      setFormValue(medicine);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleClickDelete = useCallback(
    data => {
      const medicine = R.pick(['id', 'name', 'concentration', 'form'])(data);
      setType('delete');
      setFormValue(medicine);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
          type: 'delete',
        },
      });
    } else {
      editMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
          type: 'edit',
        },
      });
    }
  }, [
    addMedicineDefinition,
    editMedicineDefinition,
    deleteMedicineDefinition,
    formValue,
    type,
  ]);
  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          New Medicine +
        </CRButton>
      </Div>
      <NewMedicineDefinition
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
      />
      <ListMedicinesDefinition
        medicines={medicineDefinitions}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default MedicineDefinition;
