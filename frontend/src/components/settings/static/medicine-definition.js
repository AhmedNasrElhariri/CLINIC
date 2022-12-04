import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Schema } from 'rsuite';
import { Div, CRButton } from 'components';
import NewMedicineDefinition from './new-medicine-definition';
import ListMedicinesDefinition from './list-medicine-definition';
import { useMedicineDefinitions } from 'hooks';
import { useForm, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';
import EditMedicine from './edit-medicine-definition';

const initValue = {
  name: '',
  // concentrations: [],
  // forms: [],
  doses: [],
  branchId: null,
  specialtyId: null,
  userId: null,
};
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('medicine name is required'),
  // concentrations: StringType().isRequired('concentration name is required'),
  // forms: StringType().isRequired('form name is required'),
});

const createDose = ({ form, concentration } = {}) => ({
  form: form || null,
  concentration: concentration || null,
});

const MedicineDefinition = () => {
  const { visible, open, close } = useModal();
  const { visible: editVisible, open: openEdit, close: closeEdit } = useModal();
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
      closeEdit();
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
      openEdit();
    },
    [openEdit, setFormValue, setType]
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
      const { doses, ...rest } = formValue;
      doses.forEach(({ form, concentration }) => {
        addMedicineDefinition({
          variables: {
            medicineDefinition: { ...rest, form, concentration },
          },
        });
      });
    } else if (type === 'delete') {
      deleteMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
          type: 'delete',
        },
      });
    }
  }, [addMedicineDefinition, deleteMedicineDefinition, formValue, type]);

  const handleEdit = useCallback(() => {
    editMedicineDefinition({
      variables: {
        medicineDefinition: formValue,
        type: 'edit',
      },
    });
  }, [editMedicineDefinition, formValue]);

  const handleAddDose = useCallback(() => {
    setFormValue(val => ({
      ...val,
      doses: val.doses.concat(createDose({})),
    }));
  }, [setFormValue]);

  const handleDeleteDose = useCallback(
    index => {
      setFormValue(val => ({
        ...val,
        doses: val.doses.reduce(
          (acc, item, idx) => (idx === index ? acc : [...acc, item]),
          []
        ),
      }));
    },
    [setFormValue]
  );

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          {t('addNewMedicine')} +
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
        onAddDose={handleAddDose}
        onDeleteDose={handleDeleteDose}
      />
      <EditMedicine
        visible={editVisible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleEdit}
        onClose={closeEdit}
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
