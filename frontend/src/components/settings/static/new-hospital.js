import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRTextArea, CRBrancheTree } from 'components';
import { Div, H3 } from 'components';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'create'
        ? t('addNewHospital')
        : type === 'edit'
        ? t('editHospital')
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
              label={t('name')}
              name="name"
              block
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
            />
            <CRTextInput label={t('phoneNo')} name="phoneNo" block />
            <CRTextArea label={t('address')} name="address" block />
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
