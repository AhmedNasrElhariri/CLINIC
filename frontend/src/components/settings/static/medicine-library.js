import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewMedicine from './new-medicine';
import ListMedicines from './list-medicine';

const initValue = { medicineName: '', concentration: '', medicineForm:''};

const MedicineLibrary = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const medicine = R.pick(['id', 'medicineName', 'concentration', 'medicineForm'])(data);
      setType('edit');
      setFormValue(medicine);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    
  }, [formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
          New Medicine +
        </CRButton>
      </Div>
      <NewMedicine
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListMedicines onEdit={handleClickEdit}/>
    </>
  );
};

export default MedicineLibrary;
