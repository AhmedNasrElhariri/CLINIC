import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Can } from 'components/user/can';
import { Div, CRButton } from 'components';
import NewSalesDefinition from './new-sales-definition';
import ListSalesesDefinition from './list-saleses-definition';
import { useForm, useSalesDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';
const initValue = {
  name: '',
  price: 0,
  cost: 0,
  quantity: 0,
  salesId: null,
  branchId: null,
  specialtyId: null,
  userId: null,
};

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Sales name is required'),
  price: NumberType().range(1, 1000000).isRequired('price is required'),
  cost: NumberType().range(1, 1000000).isRequired('units is required'),
});

const SalesDefinition = () => {
  const { visible, open, close } = useModal();
  const {
    formValue,
    setFormValue,
    type,
    setType,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue,
    model,
  });
  const {
    addSalesDefinition,
    salesesDefinition,
    editSalesDefinition,
    addSalesDefinitionQuantity,
  } = useSalesDefinition({
    onCreate: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setShow(false);
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
      const updatedFormValue = {
        quantity: formValue?.quantity,
        salesId: formValue?.salesId.id,
        name: formValue?.salesId.name,
        cost: formValue?.salesId.cost,
        price: formValue?.salesId.price,
        branchId: formValue?.salesId?.branch?.id,
        specialtyId: formValue?.salesId?.specialty?.id,
        userId: formValue?.salesId?.user?.id,
      };
      addSalesDefinitionQuantity({
        variables: {
          salesDefinition: updatedFormValue,
        },
      });
    } else if (type === 'edit') {
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
        <Can I="Define" an="Sales">
          <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
            Add New Sales Definition+
          </CRButton>
          <CRButton variant="primary" onClick={handleAddQuantity} mt={2} ml={1}>
            Add Sales Quantity+
          </CRButton>
        </Can>
      </Div>

      <NewSalesDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
      />
      <ListSalesesDefinition
        saless={salesesDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default SalesDefinition;
