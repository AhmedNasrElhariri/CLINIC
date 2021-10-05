import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput } from 'components';

function NewDentalDiagnosisDefinition({
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
    () =>
      type === 'create' ? 'Add New Dental Diagnosis' : 'Edit Dental Diagnosis ',
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
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRTextInput
          label="Dental Diagnosis Name"
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          placeholder="Type Dental Diagnosis"
          block
        />
      </Form>
    </CRModal>
  );
}

NewDentalDiagnosisDefinition.defaultProps = {
  type: 'create',
};

export default NewDentalDiagnosisDefinition;
