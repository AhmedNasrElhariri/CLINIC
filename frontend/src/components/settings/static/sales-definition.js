import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewSalesDefinition from './new-sales-definition';
import ListSalesesDefinition from './list-saleses-definition';
import { useForm, useSalesDefinition } from 'hooks';

import { useModal } from 'hooks';

const initValue = { name: '', price: 0, cost: 0, quantity: 0, salesId: null };

const SalesDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addSalesDefinition,
    salesesDefinition,
    editSalesDefinition,
    addSalesDefinitionQuantity,
  } = useSalesDefinition({
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
  const handleAddQuantity = useCallback(() => {
    setType('addQuentity');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const sales = R.pick(['id', 'name', 'price', 'cost'])(data);
      setType('edit');
      setFormValue(sales);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addSalesDefinition({
        variables: {
          salesDefinition: formValue,
        },
      });
    } else if (type === 'addQuentity') {
      addSalesDefinitionQuantity({
        variables: {
          salesDefinition: formValue,
        },
      });
    } else {
      editSalesDefinition({
        variables: {
          salesDefinition: formValue,
        },
      });
    }
  }, [addSalesDefinition, editSalesDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Sales Definition+
        </CRButton>
        <CRButton variant="primary" onClick={handleAddQuantity} mt={2} ml={1}>
          Add Sales Quantity+
        </CRButton>
      </Div>
      <NewSalesDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListSalesesDefinition
        saless={salesesDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default SalesDefinition;
