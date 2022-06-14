import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { CRModal, CRTextInput, CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';

const model = Schema.Model({});

function NewMaterialDefinition({
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
    () => (type === 'create' ? t('addNewFaceMaterial') : t('editFaceMaterial')),
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
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput
          label={t('name')}
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          // placeholder="Type Material"
          block
        />
      </Form>
    </CRModal>
  );
}

NewMaterialDefinition.defaultProps = {
  type: 'create',
};

export default NewMaterialDefinition;
