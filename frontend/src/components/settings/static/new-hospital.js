import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRTextArea, CRBrancheTree } from 'components';
import { Div, H3 } from 'components';

function NewHospital({
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
      type === 'create'
        ? 'Add New Hospital'
        : type === 'edit'
        ? 'Edit Hospital'
        : 'Delete Hospital',
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
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the hospital ? </H3>
          </Div>
        ) : (
          <>
            {' '}
            <CRTextInput
              label="Name"
              name="name"
              block
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
            />
            <CRTextInput label="Phone No" name="phoneNo" block />
            <CRTextArea label="Address" name="address" block />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.Create_Hospital}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewHospital.defaultProps = {
  type: 'create',
};

export default NewHospital;
