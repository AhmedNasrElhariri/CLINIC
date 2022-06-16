import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRNumberInput,
  CRTextInput,
  CRSelectInput,
  CRDatePicker,
  CRBrancheTree,
} from 'components';
import { useTranslation } from 'react-i18next';

function BankModel({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  banksDefinition,
  updatedexpenseType,
  action,
}) {
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'createBankRevenue'
        ? t('addNewBankTransaction')
        : type === 'createBankExpense'
        ? t('addNewBankTransaction')
        : t('editBankTransaction'),
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
        <CRTextInput label={t('name')} name="name" block></CRTextInput>
        <CRNumberInput
          label={t('revenueAmount')}
          name="amount"
          block
        ></CRNumberInput>
        <CRSelectInput
          label={t('bank')}
          name="bankId"
          data={banksDefinition}
          placeholder={t('select')}
          block
        />
        {header === 'Add New Bank Expense Transition' && (
          <>
            <CRSelectInput
              label={t('expenseType')}
              name="expenseType"
              block
              data={updatedexpenseType}
            />
          </>
        )}
        {type === 'editBankExpense' && (
          <CRSelectInput
            label={t('expenseType')}
            name="expenseType"
            block
            data={updatedexpenseType}
          />
        )}
        <CRDatePicker label={t('date')} name="date" block></CRDatePicker>
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={action}
        />
        <CRTextInput
          label={t('checkNo')}
          name="checkNumber"
          block
        ></CRTextInput>
        <CRTextInput
          label={t('invoiceNo')}
          name="invoiceNo"
          block
        ></CRTextInput>
      </Form>
    </CRModal>
  );
}

BankModel.defaultProps = {
  type: 'create',
};

export default BankModel;
