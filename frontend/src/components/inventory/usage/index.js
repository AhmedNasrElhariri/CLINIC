import React, { useState, useCallback } from 'react';
import { Form, Divider, Schema } from 'rsuite';
import * as R from 'ramda';

import { Div, CRSelectInput, CRNumberInput, H6, CRButton } from 'components';
import useFrom from 'hooks/form';
import useFetchInventory from 'hooks/fetch-inventory';
import ListInvoiceItems from 'components/appointments/list-invoice-items';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});

const initValue = {
  itemId: null,
  quantity: 1,
};

function InventoryUsage({ onChange }) {
  const { items } = useFetchInventory();
  const [invoiceItems, setInvoiceItems] = useState([]);
  const { formValue, setFormValue, reset, validate } = useFrom({
    initValue,
    model,
  });

  const handleOnChange = useCallback(
    items => {
      setInvoiceItems(items);
      onChange(items);
    },
    [onChange]
  );

  const add = useCallback(() => {
    try {
      validate();
    } catch (e) {
      return;
    }

    const item = R.find(R.propEq('id', formValue.itemId))(items);
    handleOnChange([...invoiceItems, { ...formValue, name: item.name }]);
    reset();
  }, [formValue, handleOnChange, invoiceItems, items, reset, validate]);

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  return (
    <>
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          label="Item"
          labelKey="name"
          valueKey="id"
          name="itemId"
          data={items}
          block
        ></CRSelectInput>
        <CRNumberInput
          label={
            <Div display="flex" alignItems="center">
              Quantity
              <H6 ml={2} color="texts.1">
                {/* (remaining - {4}) */}
              </H6>
            </Div>
          }
          name="quantity"
        />
        <CRButton primary small onClick={add}>
          Add
        </CRButton>
      </Form>
      <Divider />
      <ListInvoiceItems
        items={invoiceItems}
        onDelete={handleDelete}
        priceKey="quantity"
      />
    </>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
  clinic: {},
};

export default InventoryUsage;
