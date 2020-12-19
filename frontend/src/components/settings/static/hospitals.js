import React, { useCallback } from 'react';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import ListHospitals from './list-hospitals';
import { useModal } from 'components/widgets/modal';
import NewHospital from './new-hospital';
import useHospitals from 'hooks/fetch-hospitals';

const initValue = { name: '', phoneNo: '', address: '' };

function Hospitals() {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue } = useFrom({
    initValue,
  });
  const { addHospital, hospitals } = useHospitals({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
  });

  const handleonClickCreate = useCallback(() => {
    open();
  }, [open]);

  const handleAdd = useCallback(() => {
    addHospital({
      variables: {
        hospital: formValue,
      },
    });
  }, [addHospital, formValue]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleonClickCreate}>
          Hospital +
        </CRButton>
      </Div>
      <NewHospital
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
      />
      <ListHospitals hospitals={hospitals} />
    </>
  );
}

export default Hospitals;
