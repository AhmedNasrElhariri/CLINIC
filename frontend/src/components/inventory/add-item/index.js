import React, { memo, useCallback } from 'react';
import NumberFormat from 'react-number-format';
import { Form, Schema, Alert } from 'rsuite';

import { CRModal, CRButton, CRNumberInput, Div, H5 } from 'components';
import { isValid } from 'services/form';
import useFetchInventory from 'hooks/use-inventory';
import useFrom from 'hooks/form';
import { CRSelectInput } from 'components/widgets';
import useModal from 'hooks/use-model';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  amount: NumberType().isRequired('Amount Type is required'),
});

const AddItem = ({ items }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, reset } = useFrom({
    initValue: {
      itemId: null,
      amount: 1,
      price: 1,
    },
  });

  const { addItem } = useFetchInventory({
    onAddCompleted: () => {
      Alert.success('Item has been created successfully');
      close();
    },
  });

  const handleClose = useCallback(() => {
    close();
    reset();
  }, [close, reset]);

  return (
    <>
      <CRButton primary small onClick={open}>
        Add +
      </CRButton>

      <CRModal
        show={visible}
        header="Add To Inventory"
        onOk={() => {
          if (!isValid(model, formValue)) {
            Alert.error('Complete Required Fields');
            return;
          }
          addItem(formValue);
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRSelectInput
            label="Item"
            labelKey="name"
            valueKey="id"
            name="itemId"
            data={items}
            block
          ></CRSelectInput>
          <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
          <CRNumberInput label="Unit Price" name="price" block></CRNumberInput>
        </Form>
        <Div mt={3} display="flex">
          <H5 color="texts.2" fontWeight={400}>
            Total :{' '}
          </H5>
          <H5 ml={3}>
            <NumberFormat
              value={formValue.price * formValue.amount}
              displayType="text"
              thousandSeparator
            />
          </H5>
        </Div>
      </CRModal>
    </>
  );
};

AddItem.propTypes = {};

export default memo(AddItem);
