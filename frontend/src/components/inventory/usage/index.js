import React from 'react';
import { Form, Schema } from 'rsuite';

import { Div, CRSelectInput, CRNumberInput, H6 } from 'components';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import { useForm } from 'hooks';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});

const initValue = {
  itemId: null,
  quantity: 1,
};

function InventoryUsage() {
  const { formValue, setFormValue } = useForm({
    initValue,
    model,
  });

  const handleDelete = () => {};
  const items = [
    { name: 'Examination', price: 0 },
    { name: 'Followup', price: 0 },
    { name: 'Urgent', price: 0 },
    { name: 'Other', price: 0 },
  ];

  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <Div display="flex" padding={30}>
        <Div width={396} mr={30}>
          <CRSelectInput
            label="Item"
            labelKey="name"
            valueKey="id"
            name="itemId"
            data={items}
            block
          ></CRSelectInput>
          <Div my={3}>
            <ListInvoiceItems items={items} onDelete={handleDelete} />
          </Div>
        </Div>
        <Div width={104}>
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
