import { memo, useCallback, useEffect, useState } from 'react';
import { Form, Schema, Alert, Icon, Toggle } from 'rsuite';
import * as R from 'ramda';

import { CRModal, CRTextInput, CRNumberInput, Div, CRLabel } from 'components';
import { isValid } from 'services/form';
import { useInventory, useForm, useModal } from 'hooks';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
});

const EditItem = ({ defaultValue, t }) => {
  const { visible, open, close } = useModal();
  const [sellable, setSellable] = useState(false);
  const { formValue, setFormValue } = useForm({
    initValue: {
      name: '',
      sellingPrice: 0,
      alertNumberOfUnits: 1,
      quantity: 1,
    },
  });

  useEffect(() => {
    const sellable = R.propOr(false, 'sellable')(defaultValue);
    const item = R.pick([
      'id',
      'name',
      'quantity',
      'sellingPricePerBox',
      'alertNumberOfBoxes',
    ])(defaultValue);
    setFormValue({ ...item, sellable: sellable });
    setSellable(sellable);
  }, [defaultValue, setFormValue]);
  const { update } = useInventory({
    onCreateCompleted: () => {
      Alert.success('Item has been created successfully');
      close();
    },
  });
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <>
      <Icon icon="edit" onClick={open} />

      <CRModal
        show={visible}
        header="Edit Item"
        onOk={() => {
          if (!isValid(model, formValue)) {
            Alert.error('Complete Required Fields');
            return;
          }
          update({ ...formValue, sellable: sellable });
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRTextInput label="Name" name="name" block></CRTextInput>

          <CRNumberInput
            label="Selling price (medicine box)"
            name="sellingPricePerBox"
            block
          ></CRNumberInput>
          <CRNumberInput
            label={t('alertNumberOfBoxes')}
            name="alertNumberOfBoxes"
            block
          ></CRNumberInput>
          <Div mt="10px">
            <CRLabel>{t('sellable')}</CRLabel>
            <Toggle
              value={sellable}
              onChange={setSellable}
              checked={sellable}
            />
          </Div>
        </Form>
      </CRModal>
    </>
  );
};

EditItem.propTypes = {};

export default memo(EditItem);
