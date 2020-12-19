import React, { useCallback } from 'react';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import useSurgeries from 'hooks/fetch-surgeries';
import ListSurgeries from './list-surgeries';
import NewSurgery from './new-surgery';

const initValue = { name: '' };

function Surgeries() {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue } = useFrom({
    initValue,
  });
  const { defineSurgery, surgeries } = useSurgeries({
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
      <NewSurgery
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
      />
      <ListSurgeries surgeries={surgeries} />
    </>
  );
}

export default Surgeries;
