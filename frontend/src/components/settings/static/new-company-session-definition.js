import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRSelectInput, CRNumberInput } from 'components';
import { useCompanyDefinition, useSessionDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';

function NewCompanySessionDefinition({
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
      type === 'create' ? t('addNewCompanySession') : t('editCompanySession'),
    [type]
  );
  const { companysDefinition } = useCompanyDefinition({});
  const { sessionsDefinition } = useSessionDefinition({});
  const choices = useMemo(() => {
    const allChoices = [...sessionsDefinition];
    return allChoices.map(s => ({ name: s.name, id: s.name }));
  }, [sessionsDefinition]);
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
        <CRSelectInput
          label={t('companyName')}
          name="companyId"
          placeholder="Type Company"
          data={companysDefinition}
          block
        />
        <CRSelectInput
          label={t('sessionName')}
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          // placeholder="Select Type"
          data={choices}
          block
        />
        <CRNumberInput
          label={t('price')}
          name="price"
          errorMessage={
            show && checkResult['price'].hasError
              ? checkResult['price'].errorMessage
              : ''
          }
        />
      </Form>
    </CRModal>
  );
}

NewCompanySessionDefinition.defaultProps = {
  type: 'create',
};

export default NewCompanySessionDefinition;
