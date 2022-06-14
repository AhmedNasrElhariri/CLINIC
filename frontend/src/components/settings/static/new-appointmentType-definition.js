import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, Div, H3, CRRadio } from 'components';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'create'
        ? t('addNewAppointmentType')
        : type === 'edit'
        ? t('editAppointmentType')
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
              label={t('name')}
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              // placeholder="Type AppointmentType"
              block
            />
            <CRRadio name="urgent" options={options} label={t('urgent')} />
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
