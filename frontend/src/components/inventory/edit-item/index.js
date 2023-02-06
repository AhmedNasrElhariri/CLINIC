import { memo, useCallback, useEffect } from 'react';
import { Form, Schema, Alert, Icon } from 'rsuite';
import * as R from 'ramda';

import { CRModal, CRTextInput, CRNumberInput } from 'components';
import { isValid } from 'services/form';
import { useInventory, useForm, useModal } from 'hooks';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
});

const EditItem = ({ defaultValue,t }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue } = useForm({
    initValue: {
      name: '',
      sellingPrice: 0,
      alertNumberOfUnits: 1,
      quantity: 1,
    },
  });

  useEffect(() => {
    const item = R.pick([
      'id',
      'name',
      'quantity',
      'sellingPrice',
      'alertNumberOfUnits',
    ])(defaultValue);
    setFormValue(item);
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
          update(formValue);
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRTextInput label="Name" name="name" block></CRTextInput>
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
            label={t('alertNumberOfUnits')}
            name="alertNumberOfUnits"
            block
          ></CRNumberInput>
        </Form>
      </CRModal>
    </>
  );
};

EditItem.propTypes = {};

export default memo(EditItem);
