import React, { memo, useCallback, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Form, Schema, Alert } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRButton, CRNumberInput, Div, H5 } from 'components';
import { isValid } from 'services/form';
import { useInventory } from 'hooks';
import { CRSelectInput, CRBrancheTree } from 'components/widgets';
import { useForm, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const { StringType, NumberType } = Schema.Types;
const initValue = {
  itemId: null,
  amount: 1,
  price: 1,
  branchId: null,
  specialtyId: null,
  userId: null,
  level: '',
};
const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  amount: NumberType().isRequired('Amount Type is required'),
});

const AddItem = ({ items }) => {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const {
    formValue,
    setFormValue,
    reset,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue,
    model,
  });
  const { addItem, addItemLoading } = useInventory({
    onAddCompleted: () => {
      Alert.success('Item has been created successfully');
      close();
      setShow(false);
      setFormValue(initValue);
    },
  });

  const handleClose = useCallback(() => {
    close();
    reset();
  }, [close, reset]);

  return (
    <>
      <CRButton variant="primary" onClick={open}>
        {t('add')} +
      </CRButton>

      <CRModal
        show={visible}
        header={t('addToInventory')}
        loading={addItemLoading}
        onOk={() => {
          setShow(true);
          validate && addItem(formValue);
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRSelectInput
            label={t('item')}
            name="itemId"
            errorMessage={
              show && checkResult['itemId'].hasError
                ? checkResult['itemId'].errorMessage
                : ''
            }
            data={items}
            block
          ></CRSelectInput>
          <CRNumberInput
            label="Amount (No of Boxes) "
            name="amount"
            errorMessage={
              show && checkResult['amount'].hasError
                ? checkResult['amount'].errorMessage
                : ''
            }
            block
          ></CRNumberInput>
          <CRNumberInput
            label={t('unitPrice')}
            name="price"
            block
          ></CRNumberInput>
          <CRBrancheTree
            formValue={formValue}
            onChange={setFormValue}
            action={ACTIONS.AddItem_Inventory}
            notAllowSpecialty
            notAllowUser
          />
        </Form>
        <Div mt={3} display="flex">
          <H5 color="texts.2" fontWeight={400}>
            {t('total')} :{' '}
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
