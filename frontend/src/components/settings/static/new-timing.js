import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput } from 'components';

function NewTiming({
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
    () => (type === 'create' ? 'Add New Timing' : 'Edit Timing '),
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
          label="Timing Name"
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
          label="English Print Value"
          name="englishPrintValue"
          errorMessage={
            show && checkResult['englishPrintValue'].hasError
              ? checkResult['englishPrintValue'].errorMessage
              : ''
          }
          placeholder="Print Value"
          block
        />
        <CRTextInput
          label="Arabic Print Value"
          name="arabicPrintValue"
          errorMessage={
            show && checkResult['arabicPrintValue'].hasError
              ? checkResult['arabicPrintValue'].errorMessage
              : ''
          }
          placeholder="Print Value"
          block
        />
      </Form>
    </CRModal>
  );
}

NewTiming.defaultProps = {
  type: 'create',
};

export default NewTiming;
