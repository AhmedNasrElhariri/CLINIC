import { memo, useCallback, useEffect, useState } from 'react';
import { Form, Schema, Alert, Toggle } from 'rsuite';

import { CRModal, CRTextInput, CRButton, CRNumberInput, Div } from 'components';
import { CRLabel, CRSelectInput } from 'components/widgets';
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
      unitOfMeasure: 'PerUnit',
      quantity: 1,
      sellingPricePerBox: 0,
      sellingPricePerUnit: 0,
      alertNumberOfBoxes: 1,
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
  const handlePriceChange = useCallback(
    (val, type) => {
      if (type === 'sellingPricePerBox') {
        const sellingPricePerUnit = val / formValue.quantity;
        setFormValue({
          ...formValue,
          sellingPricePerUnit: sellingPricePerUnit,
          sellingPricePerBox: val,
        });
      } else {
        const sellingPricePerBox = val * formValue.quantity;
        setFormValue({
          ...formValue,
          sellingPricePerUnit: val,
          sellingPricePerBox: sellingPricePerBox,
        });
      }
    },
    [formValue.quantity]
  );

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
            label={t('noOfUnitsPerBox')}
            name="quantity"
            block
          ></CRNumberInput>
          <CRNumberInput
            label="Selling price per Box(medicine box)"
            onChange={val => handlePriceChange(val, 'sellingPricePerBox')}
            name="sellingPricePerBox"
            block
          ></CRNumberInput>
          <CRNumberInput
            label={t('sellingPricePerUnit')}
            onChange={val => handlePriceChange(val, 'sellingPricePerUnit')}
            name="sellingPricePerUnit"
            block
            float
          ></CRNumberInput>
          <CRNumberInput
            label={t('alertNumberOfBoxes')}
            name="alertNumberOfBoxes"
            block
          ></CRNumberInput>
          <Div mt="10px">
            <CRLabel>{t('sellable')}</CRLabel>
            <Toggle value={sellable} onChange={setSellable} />
          </Div>
        </Form>
      </CRModal>
    </>
  );
};

NewItem.propTypes = {};

export default memo(NewItem);
