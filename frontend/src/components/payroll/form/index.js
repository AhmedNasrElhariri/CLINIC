import React, { useState, useRef, useCallback, memo } from 'react';
import { Form, Schema, Alert } from 'rsuite';

import { CRModal, CRTextInput, CRNumberInput, CRDatePicker } from 'components';
import { isValid } from 'services/form';

const initValue = {
  name: '',
  amount: 1,
  date: null,
};

const { StringType, DateType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
  amount: NumberType().isRequired('Amount value is required'),
  date: DateType().isRequired('date is required'),
});

export const usePayrollForm = ({ header, onOk }) => {
  const [formValue, setFormValue] = useState(initValue);
  const [visible, setVisible] = useState(false);

  const onCancel = useCallback(() => {
    setFormValue(initValue);
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    formValue,
    setFormValue,
    visible,
    show,
    hide,
    header,
    onOk,
    onCancel,
    onChange: setFormValue,
    model,
  };
};

const PayrollForm = ({
  visible,
  onCancel,
  onOk,
  formValue,
  onChange,
  header,
  model,
}) => {
  const ref = useRef();
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        ref.current.check();
        if (!isValid(model, formValue)) {
          Alert.error('Complete Required Fields');
          return;
        }
        onOk(formValue);
      }}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <Form
        formValue={formValue}
        model={model}
        onChange={onChange}
        ref={ref}
        fluid
      >
        <CRTextInput label="Name" name="name" block></CRTextInput>
        <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
        <CRDatePicker
          label="Date"
          name="date"
          placement="top"
          block
        ></CRDatePicker>
      </Form>
    </CRModal>
  );
};

PayrollForm.propTypes = {};

export default memo(PayrollForm);
