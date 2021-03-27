import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import ListHospitals from './list-hospitals';
import NewHospital from './new-hospital';
import { useForm, useModal, useHospitals } from 'hooks';

const initValue = { name: '', phoneNo: '', address: '' };

const Hospitals = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addHospital, hospitals, editHospital } = useHospitals({
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
      const hospital = R.pick(['id', 'name', 'phoneNo', 'address'])(data);
      setType('edit');
      setFormValue(hospital);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addHospital({
        variables: {
          hospital: formValue,
        },
      });
    } else {
      editHospital({
        variables: {
          hospital: formValue,
        },
      });
    }
  }, [addHospital, editHospital, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          Hospital +
        </CRButton>
      </Div>
      <NewHospital
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
      />
      <ListHospitals hospitals={hospitals} onEdit={handleClickEdit} />
    </>
  );
};

export default Hospitals;
