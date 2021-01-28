import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewTest from './new-test';
import ListTests from './list-tests';
import useTests from 'hooks/fetch-tests';

const initValue = { testName: ''};

const TestLibrary = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { addTest , tests , editTest } = useTests({
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
      const test = R.pick(['id', 'testName'])(data);
      setType('edit');
      setFormValue(test);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addTest({
        variables: {
          test: formValue,
        },
      });
    } 
    else {
      editTest({
        variables: {
          test: formValue,
        },
      });
    }
  }, [addTest, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
          Add New Test +
        </CRButton>
      </Div>
      <NewTest
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListTests tests={tests} onEdit={handleClickEdit} />
    </>
  );
};

export default TestLibrary;
