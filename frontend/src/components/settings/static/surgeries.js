import React, { useCallback } from 'react';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewHospital from './new-hospital';
import useHospitals from 'hooks/fetch-hospitals';
import ListSurgeries from './list-surgeries';

const initValue = { name: '' };

function Surgeries() {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue } = useFrom({
    initValue,
  });
  const { defineSurgery, surgeries } = useHospitals({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
  });

  const handleonClickCreate = useCallback(() => {
    open();
  }, [open]);

  const handleAdd = useCallback(() => {
    defineSurgery({
      variables: {
        surgery: formValue,
      },
    });
  }, [defineSurgery, formValue]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleonClickCreate}>
          Surgery +
        </CRButton>
      </Div>
      <NewHospital
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
      />
      <ListSurgeries surgeries={surgeries} />
    </>
  );
}

export default Surgeries;
