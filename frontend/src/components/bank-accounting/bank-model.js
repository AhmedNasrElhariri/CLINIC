import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, Div, H3, CRNumberInput } from 'components';
import { useTranslation } from 'react-i18next';

function BankModel({ formValue, onChange, type, visible, onOk, onClose }) {
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'create'
        ? t('addNewBankTransition')
        : type === 'edit'
        ? t('editBankTransition')
        : t('deleteBankTransition'),
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
        {type === 'delete' ? (
          <Div>
            <H3>{t('deleteBankMessage')} </H3>
          </Div>
        ) : (
          <>
            <CRNumberInput
              label="Amount"
              name="amount"
              placeholder="Type The Amount"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

BankModel.defaultProps = {
  type: 'create',
};

export default BankModel;
