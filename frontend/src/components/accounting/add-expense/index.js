import React, { useState } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput, CRNumberInput, CRDatePicker } from 'components';

const initValue = {
  name: '',
  amount: 1,
  date: null,
  invoiceNo: '',
};

const AddExpense = ({ show, onCancel, onOk }) => {
  const [formValue, setFormValue] = useState(initValue);

  return (
    <CRModal
      show={show}
      header="Add Expense"
      onOk={() => onOk(formValue)}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRTextInput label="Name" name="name" block></CRTextInput>
        <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
        <CRDatePicker label="Date" name="date" block></CRDatePicker>
        <CRTextInput label="Invoice No" name="invoiceNo" block></CRTextInput>
      </Form>
    </CRModal>
  );
};

AddExpense.propTypes = {};

export default AddExpense;
