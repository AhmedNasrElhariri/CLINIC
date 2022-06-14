import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput } from 'components';
import { useTranslation } from 'react-i18next';

function NewCompanyDefinition({
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
    () => (type === 'create' ? t('addNewCompany') : t('editCompany')),
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
          label={t('name')}
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          // placeholder="Type Company"
          block
        />
      </Form>
    </CRModal>
  );
}

NewCompanyDefinition.defaultProps = {
  type: 'create',
};

export default NewCompanyDefinition;
