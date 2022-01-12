import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, Div, H3, CRRadio } from 'components';

const options = [{ name: 'Uregent', value: true }];
function NewAppointmentTypeDefinition({
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
        ? 'Add New AppointmentType'
        : type === 'edit'
        ? 'Edit AppointmentType'
        : 'Delete AppointmentType',
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
            <H3>Are you sure that you want to delete the AppointmentType ? </H3>
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
              placeholder="Type AppointmentType"
              block
            />
            <CRRadio name="urgent" options={options} label="Urgent"/>
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewAppointmentTypeDefinition.defaultProps = {
  type: 'create',
};

export default NewAppointmentTypeDefinition;
