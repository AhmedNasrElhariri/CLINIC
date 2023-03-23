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
  item: null,
  amount: 0,
  noOfBoxes: 0,
  purshasingPricePerUnit: 0,
  purshasingPricePerBox: 0,
  branchId: null,
  specialtyId: null,
  userId: null,
  level: '',
};
// const model = Schema.Model({
//   item: StringType().isRequired('Item is required'),
//   amount: NumberType().isRequired('Amount Type is required'),
// });

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
    // model,
  });
  const { addItem, addItemLoading } = useInventory({
    onAddCompleted: () => {
      Alert.success('Item has been created successfully');
      close();
      setShow(false);
      setFormValue(initValue);
    },
  });
  const updatedItems = items.map(i => ({ id: i, name: i.name }));
  const handleClose = useCallback(() => {
    close();
    reset();
  }, [close, reset]);
  const handleChangeBoxOrUnits = useCallback(
    (value, type) => {
      type === 'noOfUnits'
        ? setFormValue(prev => ({
            ...prev,
            amount: value,
            noOfBoxes: value / formValue?.item?.quantity,
          }))
        : setFormValue(prev => ({
            ...prev,
            noOfBoxes: value,
            amount: value * formValue?.item?.quantity,
          }));
    },
    [setFormValue, formValue?.item] // don't change these dependencies
  );
  const handleChangePurchasing = useCallback(
    (value, type) => {
      type === 'units'
        ? setFormValue(prev => ({
            ...prev,
            purshasingPricePerUnit: value,
            purshasingPricePerBox: value * formValue?.item?.quantity,
          }))
        : setFormValue(prev => ({
            ...prev,
            purshasingPricePerBox: value,
            purshasingPricePerUnit: value / formValue?.item?.quantity,
          }));
    },
    [setFormValue, formValue?.item] // don't change these dependencies
  );
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
          const { item, undefined, ...rest } = formValue;
          addItem({ ...rest, itemId: item.id });
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} onChange={setFormValue} fluid>
          <CRSelectInput
            label={t('item')}
            name="item"
            errorMessage={
              show && checkResult['itemId'].hasError
                ? checkResult['itemId'].errorMessage
                : ''
            }
            data={updatedItems}
            block
          ></CRSelectInput>
          <div className="flex items-end gap-3 mb-5">
            <CRNumberInput
              label={t('noOfUnits')}
              value={formValue.amount}
              onChange={val => handleChangeBoxOrUnits(val, 'noOfUnits')}
            />
            <CRNumberInput
              label={t('numberOfBoxes')}
              value={formValue.noOfBoxes}
              onChange={val => handleChangeBoxOrUnits(val, 'numberOfBoxes')}
            />
          </div>
          <div className="flex items-end gap-3 mb-5">
            <CRNumberInput
              label={t('purchasingPricePerUnit')}
              value={formValue.purshasingPricePerUnit}
              onChange={val => handleChangePurchasing(val, 'units')}
            />
            <CRNumberInput
              label={t('purchasingPricePerBox')}
              value={formValue.purshasingPricePerBox}
              onChange={val => handleChangePurchasing(val, 'boxes')}
            />
          </div>
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
