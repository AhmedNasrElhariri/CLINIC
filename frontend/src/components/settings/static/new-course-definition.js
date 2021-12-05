import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRTextInput,
  CRSelectInput,
  CRNumberInput,
  Div,
  H3,
} from 'components';

const coursesType = [
  { name: 'Session', id: 'Session' },
  { name: 'Per Unit', id: 'Perunit' },
];
function NewCourseDefinition({
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
        ? 'Add New Course'
        : type === 'edit'
        ? 'Edit Course'
        : 'Delete Course',
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
            <H3>Are you sure that you want to delete the Course ? </H3>
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
              placeholder="Type Course"
              block
            />
            <CRSelectInput
              label="Type"
              name="type"
              errorMessage={
                show && checkResult['type'].hasError
                  ? checkResult['type'].errorMessage
                  : ''
              }
              block
              data={coursesType}
            />
            <CRNumberInput
              label="Price"
              name="price"
              errorMessage={
                show && checkResult['price'].hasError
                  ? checkResult['price'].errorMessage
                  : ''
              }
            />
            <CRNumberInput
              label="Number of Sessions/Units"
              name="units"
              errorMessage={
                show && checkResult['units'].hasError
                  ? checkResult['units'].errorMessage
                  : ''
              }
            />
            {formValue.type === 'Perunit' && (
              <CRTextInput
                label="Messure Of Units"
                name="messureOfUnits"
                placeholder="Type Messure Of Units"
                block
              />
            )}
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewCourseDefinition.defaultProps = {
  type: 'create',
};

export default NewCourseDefinition;
