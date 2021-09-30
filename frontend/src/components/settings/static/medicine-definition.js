import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Schema } from 'rsuite';
import { Div, CRButton } from 'components';
import NewMedicineDefinition from './new-medicine-definition';
import ListMedicinesDefinition from './list-medicine-definition';
import { useMedicineDefinitions } from 'hooks';
import { useForm, useModal } from 'hooks';
import { Validate } from 'services/form';

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
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addMedicineDefinition, medicineDefinitions, editMedicineDefinition } =
    useMedicineDefinitions({
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
      const medicine = R.pick(['id', 'name', 'concentration', 'form'])(data);
      setType('edit');
      setFormValue(medicine);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create' && Validate(model, formValue)) {
      addMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
        },
      });
    } else {
      editMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
        },
      });
    }
  }, [addMedicineDefinition, editMedicineDefinition, formValue, type]);
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
      />
      <ListMedicinesDefinition
        medicines={medicineDefinitions}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default MedicineDefinition;
