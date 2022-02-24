import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  Div,
  H3,
  CRNumberInput,
  CRTextInput,
  CRSelectInput,
  CRDatePicker,
  CRBrancheTree,
} from 'components';
import { ACTIONS } from 'utils/constants';
function BankModel({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  banksDefinition,
  updatedexpenseType,
  checkResult,
  validate,
  show,
  setShow,
  loading,
}) {
  const header = useMemo(
    () =>
      type === 'createBankRevenue'
        ? 'Add New Bank Revenue Transition'
        : type === 'createBankExpense'
        ? 'Add New Bank Expense Transition'
        : 'edit Bank Transition',
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRTextInput label="Name" name="name" block></CRTextInput>
        <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
        <CRSelectInput
          label="Bank Name"
          name="bankId"
          data={banksDefinition}
          placeholder="Select One Bank "
          block
        />
        {header === 'Add New Bank Expense Transition' && (
          <>
            <CRSelectInput
              label="Expense Type"
              name="expenseType"
              block
              data={updatedexpenseType}
            />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.AddExpense_Accounting}
            />
          </>
        )}
        {header === 'Add New Bank Revenue Transition' && (
          <CRBrancheTree
            formValue={formValue}
            onChange={onChange}
            action={ACTIONS.AddRevenue_Accounting}
          />
        )}
        {type === 'editBankExpense' && (
          <CRSelectInput
            label="Expense Type"
            name="expenseType"
            block
            data={updatedexpenseType}
          />
        )}
        <CRDatePicker label="Date" name="date" block></CRDatePicker>
        <CRTextInput label="Check No" name="checkNumber" block></CRTextInput>
        <CRTextInput label="Invoice No" name="invoiceNo" block></CRTextInput>
      </Form>
    </CRModal>
  );
}

BankModel.defaultProps = {
  type: 'create',
};

export default BankModel;
