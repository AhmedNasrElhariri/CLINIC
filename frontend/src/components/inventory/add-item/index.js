import React, { memo, useCallback, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Form, Schema, Alert } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRButton, CRNumberInput, Div, H5 } from 'components';
import { isValid } from 'services/form';
import { useInventory } from 'hooks';
import { CRSelectInput, CRBrancheTree } from 'components/widgets';
import { useForm, useModal } from 'hooks';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  amount: NumberType().isRequired('Amount Type is required'),
});

const AddItem = ({ items }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, reset } = useForm({
    initValue: {
      itemId: null,
      amount: 1,
      price: 1,
      branchId: null,
      specialtyId: null,
      userId: null,
      level: '',
    },
  });
  const { addItem, addItemLoading } = useInventory({
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
      <CRButton variant="primary" onClick={open}>
        Add +
      </CRButton>

      <CRModal
        show={visible}
        header="Add To Inventory"
        loading={addItemLoading}
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
            name="itemId"
            data={items}
            block
          ></CRSelectInput>
          <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
          <CRNumberInput label="Unit Price" name="price" block></CRNumberInput>
          <CRBrancheTree
            formValue={formValue}
            onChange={setFormValue}
            action={ACTIONS.AddItem_Inventory}
          />
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
