import React, { useState, useCallback } from 'react';
import { Form, Divider, Schema } from 'rsuite';
import * as R from 'ramda';

import { Div, CRSelectInput, CRNumberInput, H6, CRButton } from 'components';
import useFrom from 'hooks/form';
import useFetchInventory from 'hooks/use-inventory';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import { ItemDiv, QualityDiv, Container, ButtonsDiv, Button } from './style';
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});

const initValue = {
  itemId: null,
  quantity: 1,
};

function InventoryUsage({ onChange, handleCancel }) {
  //const { items } = useFetchInventory();
  const [invoiceItems, setInvoiceItems] = useState([]);
  const { formValue, setFormValue, reset, validate } = useFrom({
    initValue,
    model,
  });

  // const handleOnChange = useCallback(
  //   items => {
  //     setInvoiceItems(items);
  //     onChange(items);
  //   },
  //   [onChange]
  // );

  // const add = useCallback(() => {
  //   try {
  //     validate();
  //   } catch (e) {
  //     return;
  //   }

  //   const item = R.find(R.propEq('id', formValue.itemId))(items);
  //   handleOnChange([...invoiceItems, { ...formValue, name: item.name }]);
  //   reset();
  // }, [formValue, handleOnChange, invoiceItems, items, reset, validate]);

  // const handleDelete = useCallback(
  //   idx => {
  //     handleOnChange(R.remove(idx, 1));
  //   },
  //   [handleOnChange]
  // );
  const handleDelete = () => {

  };
  const items = [
    {  name: 'Examination', price: 0 } ,
    {  name: 'Followup', price: 0 } ,
    {  name: 'Urgent', price: 0  },
    { name: 'Other', price: 0  },
  ];

  return (
    <>
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
              <ListInvoiceItems
                items={items}
                onDelete={handleDelete}
              />
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
      <ButtonsDiv>
        <Button
          width="81px"
          padding="9px 24px 10px 25px"
          bgColor="#b6b7b7"
          color="#283148"
          marginLeft="319px"
          height="35px"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          width="106px"
          padding="9px 40px"
          bgColor="#50c7f2"
          color="#ffffff"
          marginLeft="26px"
          height="35px"
        >
          Done
        </Button>
      </ButtonsDiv>
    </>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
