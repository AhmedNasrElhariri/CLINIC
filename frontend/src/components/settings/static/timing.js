import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewTiming from './new-timing';
import ListTiming from './list-timing';
import { useForm, useModal, useTimings } from 'hooks';
import { Validate } from 'services/form';
import { Schema } from 'rsuite';

const initValue = { name: '', englishPrintValue: '', arabicPrintValue: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Timing name is required'),
  englishPrintValue: StringType().isRequired('english Print Value is required'),
  arabicPrintValue: StringType().isRequired('Arabic Print Value is required'),
});

const Timing = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
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
    if (type === 'create' && Validate(model,formValue)) {
      addTiming({
        variables: {
          timing: formValue,
        },
      });
    } else if(type === 'edit' && Validate(model,formValue)) {
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
