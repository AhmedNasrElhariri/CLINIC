import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewTestDefinition from './new-test-definition';
import ListTestsDefinition from './list-tests-definition';
import useTestsDefinition from 'hooks/fetch-tests-definition';
import useModal from 'hooks/use-model';
import Prescription from './prescription/index.js';
import Invoice from 'components/appointments/finish-appointments';
const initValue = { testName: '' };

const TestDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const {
    addTestDefinition,
    testsDefinition,
    editTestDefinition,
  } = useTestsDefinition({
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
      const testDefinition = R.pick(['id', 'testName'])(data);
      setType('edit');
      setFormValue(testDefinition);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addTestDefinition({
        variables: {
          testDefinition: formValue,
        },
      });
    } else {
      editTestDefinition({
        variables: {
          testDefinition: formValue,
        },
      });
    }
  }, [addTestDefinition, formValue, type]);

  return (
    <>
      {/* <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
          Add New Test +
        </CRButton>
      </Div>
      <NewTestDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      /> */}
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
          Prescription
        </CRButton>
      </Div>
      <Prescription
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      {/* <Invoice
        show={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      /> */}
      <ListTestsDefinition tests={testsDefinition} onEdit={handleClickEdit} />
    </>
  );
};

export default TestDefinition;
