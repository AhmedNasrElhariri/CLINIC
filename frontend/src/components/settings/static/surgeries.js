import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import useModal from 'hooks/use-model';
import useSurgeries from 'hooks/fetch-surgeries';
import ListSurgeries from './list-surgeries';
import NewSurgery from './new-surgery';

const initValue = { name: '' };

function Surgeries() {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { defineSurgery,editSurgery, surgeries } = useSurgeries({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
    },
  });

  const handleonClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const surgery = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(surgery);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      defineSurgery({
        variables: {
          surgery: formValue,
        },
      });
    } else {
      editSurgery({
        variables: {
          surgery: formValue,
        },
      });
    }
  }, [defineSurgery, editSurgery, formValue, type]);

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
      <ListSurgeries surgeries={surgeries} onEdit={handleClickEdit} />
    </>
  );
}

export default Surgeries;
