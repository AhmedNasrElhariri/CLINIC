import React from 'react';
import { Form, Schema } from 'rsuite';

import { Div, CRSelectInput, CRNumberInput, H6 } from 'components';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import { ItemDiv, QualityDiv, Container } from './style';
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
      <Container>
        <ItemDiv>
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
        </ItemDiv>
        <QualityDiv>
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
        </QualityDiv>
      </Container>
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
