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
  unitOfMeasure: StringType().isRequired('unit Of Measure is required'),
});

const NewItem = () => {
  const { visible, open, close } = useModal();
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
      barcode: '',
      notes: '',
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

  return (
    <>
      <CRButton variant="primary" onClick={open}>
        New +
      </CRButton>

      <CRModal
        show={visible}
        header="Add Item"
        loading={createItemLoading}
        onOk={() => {
          setShow(true);
          validate && create(formValue);
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRTextInput
            label="Name"
            name="name"
            errorMessage={
              show && checkResult['name'].hasError
                ? checkResult['name'].errorMessage
                : ''
            }
            block
          ></CRTextInput>
          <CRSelectInput
            label="Unit Of measure"
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
