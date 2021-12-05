import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, Div, H3 } from 'components';

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
    () =>
      type === 'create'
        ? 'Add New Timing'
        : type === 'edit'
        ? 'Edit Timing'
        : 'Delete Timing',
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
            <H3>Are you sure that you want to delete the Timing ? </H3>
          </Div>
        ) : (
          <>
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
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewTiming.defaultProps = {
  type: 'create',
};

export default NewTiming;
