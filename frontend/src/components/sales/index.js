import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewSales from './new-sales';
import ListSaleses from './list-sales';
import { useForm, useSales } from 'hooks';

import { useModal } from 'hooks';

const initValue = { salesDefinitionId: '', quantity: '' };

const Sales = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addSales, saleses, editSales } = useSales({
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
      const sales = R.pick(['id', 'quantity','salesDefinitionId'])(data);
      setType('edit');
      setFormValue(sales);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addSales({
        variables: {
          sales: formValue,
        },
      });
    } else {
      editSales({
        variables: {
          sales: formValue,
        },
      });
    }
  }, [addSales, editSales, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Sales +
        </CRButton>
      </Div>
      <NewSales
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListSaleses saleses={saleses} onEdit={handleClickEdit} />
    </>
  );
};

export default Sales;
