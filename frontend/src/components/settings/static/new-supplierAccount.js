import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, Div, H3 } from 'components';

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
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New SupplierAccount'
        : type === 'edit'
        ? 'Edit SupplierAccount'
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
              label="SupplierAccount Name"
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Name"
              block
            />
            <CRTextInput
              label="Phone No"
              name="phoneNo"
              errorMessage={
                show && checkResult['phoneNo'].hasError
                  ? checkResult['phoneNo'].errorMessage
                  : ''
              }
              placeholder="phoneNo"
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
