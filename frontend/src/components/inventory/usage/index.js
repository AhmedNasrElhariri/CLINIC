import React, { useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';
import { Form, Schema } from 'rsuite';

import { Div, CRSelectInput, CRNumberInput } from 'components';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import { useForm, useInventory } from 'hooks';
import { CRButton } from 'components/widgets';
import { normalize } from 'utils/misc';

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
  const [selectedItems, setSelectedItems] = useState([]);

  const { items } = useInventory();

  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
      onChange(newItems);
    },
    [onChange, selectedItems]
  );

  const handleAdd = useCallback(() => {
    const newItems = [...selectedItems, formValue];
    setSelectedItems(newItems);
    setFormValue(initValue);
    onChange(newItems);
  }, [onChange, formValue, selectedItems]);

  const itemsChoices = useMemo(() => {
    const selectedItemIds = R.map(R.prop('itemId'))(selectedItems);
    return items.filter(f => !selectedItemIds.includes(f.id));
  }, [selectedItems]);

  const itemsList = useMemo(() => {
    const byIds = normalize(items);
    return selectedItems.map(({ itemId, quantity }) => ({
      ...byIds[itemId],
      price: quantity,
    }));
  }, [selectedItems]);

  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <Div display="flex" padding={30}>
        <Div width={396} mr={30}>
          <CRSelectInput
            label="Item"
            name="itemId"
            data={itemsChoices}
            block
          ></CRSelectInput>
        </Div>
        <Div width={200}>
          <CRNumberInput name="quantity" label="Quantity" name="quantity" />
        </Div>
        <CRButton variant="primary" onClick={handleAdd}>
          add
        </CRButton>
      </Div>
      <ListInvoiceItems items={itemsList} onDelete={handleDelete} />
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
