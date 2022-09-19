import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, Div, H3 } from 'components';
import { useTranslation } from 'react-i18next';

function NewSupplierAccount({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
  loading,
}) {
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'create'
        ? t('addNewSupplierAccount')
        : type === 'edit'
        ? t('editSupplierAccount')
        : 'Delete SupplierAccount',
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        setShow(true);
        validate && onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
      loading={loading}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the SupplierAccount ? </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label={t('name')}
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              // placeholder="Name"
              block
            />
            <CRTextInput
              label={t('phoneNo')}
              name="phoneNo"
              errorMessage={
                show && checkResult['phoneNo'].hasError
                  ? checkResult['phoneNo'].errorMessage
                  : ''
              }
              // placeholder="phoneNo"
              block
            />
            <CRTextInput
              label={t('taxNumber')}
              name="taxNumber"
              // placeholder="phoneNo"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewSupplierAccount.defaultProps = {
  type: 'create',
};

export default NewSupplierAccount;
