import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewPrice from './new-price';
import ListPrices from './list-prices';
import { useForm, usePrice } from 'hooks';

import { useModal } from 'hooks';

const initValue = {
  Apptype: 'Examination',
  price: 0,
  branchId: null,
  specialtyId: null,
  userId: null,
  level: '',
};

const Price = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });

  const { addPrice, prices, editPrice } =
    usePrice({
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
      const price = R.pick(['id', 'Apptype'])(data);
      setType('edit');
      setFormValue(price);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addPrice({
        variables: {
          price: formValue,
        },
      });
    } else {
      editPrice({
        variables: {
          price: formValue,
        },
      });
    }
  }, [addPrice, editPrice, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Price+
        </CRButton>
      </Div>
      <NewPrice
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListPrices prices={prices} onEdit={handleClickEdit} />
    </>
  );
};

export default Price;
