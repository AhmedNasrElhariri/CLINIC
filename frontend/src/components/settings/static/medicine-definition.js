import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewMedicineDefinition from './new-medicine-definition';
import ListMedicinesDefinition from './list-medicine-definition';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';
import useModal from 'hooks/use-model';

const initValue = { name: '', concentration: '', form: '' };

const MedicineDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });

  const {
    addMedicineDefinition,
    medicines,
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
      const medicine = R.pick(['id', 'name', 'concentration', 'form'])(data);
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
      <ListMedicinesDefinition medicines={medicines} onEdit={handleClickEdit} />
    </>
  );
};

export default MedicineDefinition;
