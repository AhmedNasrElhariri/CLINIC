import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, Div, H3 } from 'components';

const model = Schema.Model({});
function NewImageCategory({
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
        ? 'Add New Image Category'
        : type === 'edit'
        ? 'Edit Image Category'
        : 'Delete Image Category',
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
              Are you sure that you want to delete the Image Category and all
              related images ?{' '}
            </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label="Name"
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Type Name"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewImageCategory.defaultProps = {
  type: 'create',
};

export default NewImageCategory;
