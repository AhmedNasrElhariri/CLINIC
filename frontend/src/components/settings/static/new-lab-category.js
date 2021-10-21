import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

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
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Lab Category' : 'Edit Lab Category '),
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
    >
      <Form formValue={formValue}  onChange={onChange} fluid>
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
      </Form>
    </CRModal>
  );
}

NewLabCategory.defaultProps = {
  type: 'create',
};

export default NewLabCategory;
