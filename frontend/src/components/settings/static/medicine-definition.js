import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewMedicineDefinition from './new-medicine-definition';
import ListMedicinesDefinition from './list-medicine-definition';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';
import useModal from 'hooks/use-model';

const initValue = { medicineName: '', concentration: '', medicineForm: '' };

const MedicineDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });

  const {
    addMedicineDefinition,
    medicinesDefinition,
    editMedicineDefinition,
  } = useMedicinesDefinition({
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
      const medicine = R.pick([
        'id',
        'medicineName',
        'concentration',
        'medicineForm',
      ])(data);
      setType('edit');
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
    } else {
      editMedicineDefinition({
        variables: {
          medicineDefinition: formValue,
        },
      });
    }
  }, [addMedicineDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
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
        medicines={medicinesDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default MedicineDefinition;
