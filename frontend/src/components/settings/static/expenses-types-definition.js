import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewExpenseTypeDefinition from './new-expenseType-definition';
import ListExpenseTypesDefinition from './list-expenseTypes-definition';
import { useForm, useExpenseTypeDefinition } from 'hooks';

import { useModal } from 'hooks';

const initValue = { name: ''};

const ExpenseTypeDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addExpenseTypeDefinition,
    expenseTypesDefinition,
    editExpenseTypeDefinition,
  } = useExpenseTypeDefinition({
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
      const expenseType = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(expenseType);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addExpenseTypeDefinition({
        variables: {
          expenseTypeDefinition: formValue,
        },
      });
    } else {
      editExpenseTypeDefinition({
        variables: {
          expenseTypeDefinition: formValue,
        },
      });
    }
  }, [addExpenseTypeDefinition, editExpenseTypeDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Expense Type+
        </CRButton>
      </Div>
      <NewExpenseTypeDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListExpenseTypesDefinition
        expenseTypes={expenseTypesDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default ExpenseTypeDefinition;
