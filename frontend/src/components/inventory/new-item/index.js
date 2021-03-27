import React, { memo, useCallback } from 'react';
import { Form, Schema, Alert } from 'rsuite';

import {
  CRModal,
  CRTextInput,
  CRTextArea,
  CRButton,
  CRNumberInput,
} from 'components';
import { isValid } from 'services/form';
import { CRSelectInput } from 'components/widgets';
import { UNIT_OF_MEASURES } from 'utils/constants';
import { useForm, useInventory, useModal } from 'hooks';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
  unitOfMeasure: StringType().isRequired('Name Type is required'),
});

const NewItem = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, reset } = useForm({
    initValue: {
      name: '',
      unitOfMeasure: '',
      quantity: 1,
      barcode: '',
      notes: '',
    },
  });

  const { create } = useInventory({
    onCreateCompleted: () => {
      Alert.success('Item has been created successfully');
      reset();
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
        New +
      </CRButton>

      <CRModal
        show={visible}
        header="Add Item"
        onOk={() => {
          if (!isValid(model, formValue)) {
            Alert.error('Complete Required Fields');
            return;
          }
          create(formValue);
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRTextInput label="Name" name="name" block></CRTextInput>
          <CRSelectInput
            label="Unit Of measure"
            name="unitOfMeasure"
            data={UNIT_OF_MEASURES}
            block
          ></CRSelectInput>
          <CRNumberInput label="Quantity" name="quantity" block></CRNumberInput>
          <CRTextInput label="Barcode" name="barcode" block></CRTextInput>
          <CRTextArea label="Notes" name="notes" block></CRTextArea>
        </Form>
      </CRModal>
    </>
  );
};

NewItem.propTypes = {};

export default memo(NewItem);
