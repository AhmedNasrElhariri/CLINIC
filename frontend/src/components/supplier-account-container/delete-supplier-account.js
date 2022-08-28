import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, Div, H3 } from 'components';
import { useTranslation } from 'react-i18next';

function DeleteSupplierAccount({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'create'
        ? t('addSupplierAccount')
        : type === 'delete'
        ? t('deleteSupplierAccount')
        : '',
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
            <H3>
              Are you sure that you want to delete the Supplier Account and All
              related data ?{' '}
            </H3>
          </Div>
        ) : (
          <></>
        )}
      </Form>
    </CRModal>
  );
}

export default DeleteSupplierAccount;
