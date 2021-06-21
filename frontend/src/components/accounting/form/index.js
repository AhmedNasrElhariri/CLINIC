import React, { useState, useRef, useCallback, memo } from 'react';
import { Form, Schema, Alert } from 'rsuite';

import {
  CRModal,
  CRTextInput,
  CRNumberInput,
  CRDatePicker,
  CRBrancheTree,
  CRSelectInput,
} from 'components';
import { useExpenseTypeDefinition } from 'hooks';
import { isValid } from 'services/form';

const initValue = {
  name: '',
  amount: 1,
  date: null,
  expenseType: '',
  invoiceNo: '',
  branchId: null,
  specialtyId: null,
  userId: null,
};

const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
  date: DateType().isRequired('date is required'),
});

export const useAccountingForm = ({ header, onOk }) => {
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

const AccountingForm = ({
  visible,
  onCancel,
  onOk,
  formValue,
  onChange,
  header,
  model,
}) => {
  const { expenseTypesDefinition } = useExpenseTypeDefinition({});
  const updatedexpenseType = expenseTypesDefinition.map(e => {
    return {
      id: e.name,
      name: e.name,
    };
  });
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
        {header === 'New Expense' && (
          <CRSelectInput
            label="Expense Type"
            name="expenseType"
            block
            data={updatedexpenseType}
          />
        )}
        <CRBrancheTree formValue={formValue} onChange={onChange} />
        <CRDatePicker label="Date" name="date" block></CRDatePicker>
        <CRTextInput label="Invoice No" name="invoiceNo" block></CRTextInput>
      </Form>
    </CRModal>
  );
};

AccountingForm.propTypes = {};

export default memo(AccountingForm);
