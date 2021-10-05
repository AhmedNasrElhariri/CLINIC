import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRBrancheTree } from 'components';

function NewSurgery({
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
    () => (type === 'create' ? 'Add New Surgery' : 'Edit Surgery'),
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
          label="Name"
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          block
        />
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={ACTIONS.Create_Surgery}
        />
      </Form>
    </CRModal>
  );
}

NewSurgery.defaultProps = {
  type: 'create',
};

export default NewSurgery;
