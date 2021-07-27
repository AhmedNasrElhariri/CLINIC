import React, { useCallback } from 'react';
import * as R from 'ramda';
import Filter from '../../filters';
import { Div, CRButton } from 'components';
import ListSurgeries from './list-surgeries';
import NewSurgery from './new-surgery';
import { Can } from 'components/user/can';
import { useForm, useModal, useSurgeries, useAppointments } from 'hooks';

const initValue = { name: '', branchId: null, specialtyId: null, userId: null };

function Surgeries() {
  const { visible, open, close } = useModal();
  const { filterBranches } = useAppointments();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { defineSurgery, editSurgery, surgeries } = useSurgeries({
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
        <Can I="Create" an="Surgery">
          <CRButton variant="primary" onClick={handleonClickCreate}>
            Surgery +
          </CRButton>
        </Can>
      </Div>
      <NewSurgery
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
      />
      <Filter
        appointments={surgeries}
        branches={filterBranches}
        render={surgs => (
          <ListSurgeries surgeries={surgs} onEdit={handleClickEdit} />
        )}
      />
    </>
  );
}

export default Surgeries;
