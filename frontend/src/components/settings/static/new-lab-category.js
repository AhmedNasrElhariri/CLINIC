import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput, Div, H3 } from 'components';

function NewLabCategory({
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
        ? 'Add New Lab Category'
        : type === 'edit'
        ? 'Edit Lab Category'
        : 'Delete Lab Category',
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
            <H3>
              Are you sure that you want to delete the Lab Category and all
              related labs ?{' '}
            </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label="Lab Category Name"
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Type Lab Category"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewLabCategory.defaultProps = {
  type: 'create',
};

export default NewLabCategory;
