import React, { useState, useRef, useEffect } from 'react';
import { Form, Schema, Alert } from 'rsuite';

import { CRModal, CRTextInput, CRNumberInput, CRDatePicker } from 'components';
import { isValid } from 'services/form';
import { FORM_ACTIONS } from 'utils/constants';

const { StringType, DateType } = Schema.Types;

const initValue = {
  name: '',
  amount: 1,
  date: null,
  invoiceNo: '',
};

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
  date: DateType().isRequired('date is required'),
});

const ExpenseForm = ({ action, show, onCancel, onOk, expense }) => {
  const [formValue, setFormValue] = useState(initValue);
  const ref = useRef();

  // useEffect(() => {
  //   if (expense != null && action === FORM_ACTIONS.EDIT) [
  //     formValue();
  //   ]
  // })

  return (
    <CRModal
      show={show}
      header={`${action === FORM_ACTIONS.CREATE ? 'Add' : 'Edit'} Expense`}
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
        onChange={setFormValue}
        ref={ref}
        fluid
      >
        <CRTextInput label="Name" name="name" block></CRTextInput>
        <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
        <CRDatePicker
          label="Date"
          name="date"
          block
        ></CRDatePicker>
        <CRTextInput label="Invoice No" name="invoiceNo" block></CRTextInput>
      </Form>
    </CRModal>
  );
};

ExpenseForm.propTypes = {};

export default ExpenseForm;
