import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
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

const RevenueForm = ({ action, show, onCancel, onOk }) => {
  const [formValue, setFormValue] = useState(initValue);
  const ref = useRef();

  return (
    <CRModal
      show={show}
      header={`${action === FORM_ACTIONS.CREATE ? 'Add' : 'Edit'} Revenue`}
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
        fluid
        formValue={formValue}
        onChange={setFormValue}
        model={model}
        ref={ref}
      >
        <CRTextInput label="Name" name="name" block></CRTextInput>
        <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
        <CRDatePicker
          label="Date"
          name="date"
          placement="top"
          block
        ></CRDatePicker>
        <CRTextInput label="Invoice No" name="invoiceNo" block></CRTextInput>
      </Form>
    </CRModal>
  );
};

RevenueForm.propTypes = {
  action: PropTypes.oneOf([FORM_ACTIONS.CREATE, FORM_ACTIONS.EDIT]).isRequired,
};

export default RevenueForm;
