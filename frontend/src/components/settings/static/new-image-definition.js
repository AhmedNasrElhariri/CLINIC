import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput } from 'components';
import { useImageCategory } from 'hooks';
const model = Schema.Model({});

function NewImageDefinition({
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
    () => (type === 'create' ? 'Add New Image' : 'Edit Image '),
    [type]
  );
  const { imagesCategory } = useImageCategory();
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
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRTextInput
          label="Image Name"
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          placeholder="Type Image"
          block
        />
        <CRSelectInput
          label="Image Category"
          name="categoryId"
          block
          data={imagesCategory}
        />
      </Form>
    </CRModal>
  );
}

NewImageDefinition.defaultProps = {
  type: 'create',
};

export default NewImageDefinition;
