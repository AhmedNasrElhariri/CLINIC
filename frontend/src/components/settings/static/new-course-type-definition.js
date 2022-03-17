import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRNumberInput, CRTextInput } from 'components';
function NewCourseTypeDefinition({
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
        ? 'Add New CourseType Definition'
        : 'Edit CourseType Definition ',
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
        <CRNumberInput
          label="Price"
          name="price"
          errorMessage={
            show && checkResult['price'].hasError
              ? checkResult['price'].errorMessage
              : ''
          }
          placeholder="Type Price"
          block
        />
      </Form>
    </CRModal>
  );
}

NewCourseTypeDefinition.defaultProps = {
  type: 'create',
};

export default NewCourseTypeDefinition;
