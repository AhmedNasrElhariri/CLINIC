import React, { useMemo } from 'react';
import { Form, InputNumber } from 'rsuite';
import { CRModal, CRNumberInput, CRTextInput, CRLabel } from 'components';
function NewSessionDefinition({
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
        ? 'Add New Session Definition'
        : 'Edit Session Definition ',
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
        <CRLabel>Price</CRLabel>
        <InputNumber
          // defaultValue={0.01}
          // step={0.01}
          value={formValue.price}
          onChange={val => {
            onChange({ ...formValue, price: val });
          }}
          errorMessage={
            show && checkResult['price'].hasError
              ? checkResult['price'].errorMessage
              : ''
          }
          placeholder="Type Price"
        />
        {/* <CRNumberInput
          label="Price"
          name="price"
          errorMessage={
            show && checkResult['price'].hasError
              ? checkResult['price'].errorMessage
              : ''
          }
          placeholder="Type Price"
          block
        /> */}
        <CRNumberInput
          label="Duration"
          name="duration"
          placeholder="Type Duration"
          block
        />
      </Form>
    </CRModal>
  );
}

NewSessionDefinition.defaultProps = {
  type: 'create',
};

export default NewSessionDefinition;
