import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, Schema, Alert, Toggle } from 'rsuite';

import { CRModal, CRTextInput, CRButton, CRNumberInput } from 'components';
// import { isValid } from 'services/form';
import { CRSelectInput } from 'components/widgets';
import { UNIT_OF_MEASURES } from 'utils/constants';
import { useForm, useInventory, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
  unitOfMeasure: StringType().isRequired('unit Of Measure is required'),
});

const NewItem = () => {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const [sellable, setSellable] = useState(false);
  const {
    formValue,
    setFormValue,
    reset,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue: {
      name: '',
      unitOfMeasure: '',
      quantity: 1,
      sellingPrice: 0,
      alertNumberOfUnits: 1,
      unitSellingPrice: 1,
    },
    model,
  });

  const { create, createItemLoading } = useInventory({
    onCreateCompleted: () => {
      Alert.success('Item has been created successfully');
      reset();
      close();
      setShow(false);
    },
  });

  const handleClose = useCallback(() => {
    close();
    reset();
  }, [close, reset]);
  useEffect(() => {
    setFormValue(prev => ({
      ...prev,
      unitSellingPrice: formValue.sellingPrice / formValue.quantity,
    }));
  }, [setFormValue, formValue.sellingPrice, formValue.quantity]);
  return (
    <>
      <CRButton variant="primary" onClick={open}>
        {t('add')} +
      </CRButton>

      <CRModal
        show={visible}
        header={t('addItem')}
        loading={createItemLoading}
        onOk={() => {
          setShow(true);
          const { unitSellingPrice, ...rest } = formValue;
          validate && create({ ...rest, sellable: sellable });
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRTextInput
            label={t('name')}
            name="name"
            errorMessage={
              show && checkResult['name'].hasError
                ? checkResult['name'].errorMessage
                : ''
            }
            block
          ></CRTextInput>
          <CRSelectInput
            label={t('messureOfUnits')}
            name="unitOfMeasure"
            errorMessage={
              show && checkResult['unitOfMeasure'].hasError
                ? checkResult['unitOfMeasure'].errorMessage
                : ''
            }
            valueKey="value"
            data={UNIT_OF_MEASURES}
            block
          ></CRSelectInput>
          <CRNumberInput
            label={t('numberOfUnits')}
            name="quantity"
            block
          ></CRNumberInput>
          <CRNumberInput
            label={t('sellingPrice')}
            name="sellingPrice"
            block
          ></CRNumberInput>
          <CRNumberInput
            label={t('unitSellingPrice')}
            name="unitSellingPrice"
            block
            disabled
          ></CRNumberInput>
          <CRNumberInput
            label={t('alertNumberOfUnits')}
            name="alertNumberOfUnits"
            block
          ></CRNumberInput>
          <Toggle
            label={t('sellable')}
            value={sellable}
            onChange={setSellable}
          />
        </Form>
      </CRModal>
    </>
  );
};

NewItem.propTypes = {};

export default memo(NewItem);
