import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewTiming from './new-timing';
import ListTiming from './list-timing';
import useTimings from 'hooks/fetch-timing';
import useModal from 'hooks/use-model';

const initValue = { name: '', englishPrintValue: '', arabicPrintValue: '' };

const Timing = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { addTiming, timings, editTiming } = useTimings({
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
      const timing = R.pick([
        'id',
        'name',
        'englishPrintValue',
        'arabicPrintValue',
      ])(data);
      setType('edit');
      setFormValue(timing);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addTiming({
        variables: {
          timing: formValue,
        },
      });
    } else {
      editTiming({
        variables: {
          timing: formValue,
        },
      });
    }
  }, [addTiming, editTiming, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          Add New Timing +
        </CRButton>
      </Div>
      <NewTiming
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListTiming timings={timings} onEdit={handleClickEdit} />
    </>
  );
};

export default Timing;
