import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Form, Schema } from 'rsuite';

import { Div, CRSelectInput, CRNumberInput } from 'components';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import { useForm, useInventory } from 'hooks';

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
  const { formValue, setFormValue } = useForm({
    initValue,
    model,
  });
  const { items } = useInventory();

  const handleOnChange = useCallback(
    items => {
      // setInvoiceItems(items);
      onChange(items);
    },
    [onChange]
  );

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1)(items));
    },
    [handleOnChange]
  );
  
  const handleAdd = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1)(items));
    },
    [handleOnChange]
  );

  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <Div display="flex" padding={30}>
        <Div width={396} mr={30}>
          <CRSelectInput
            label="Item"
            name="itemId"
            data={items}
            // onChange={onAdd}
            block
          ></CRSelectInput>
          <Div my={3}>
            <ListInvoiceItems items={[]} onDelete={handleDelete} />
          </Div>
        </Div>
        <Div width={200}>
          <CRNumberInput label="Quantity" name="quantity" />
        </Div>
      </Div>
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
