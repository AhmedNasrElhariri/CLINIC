import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRNumberInput, CRTextInput } from 'components';
import { useTranslation } from 'react-i18next';

function NewCourseTypeDefinition({
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
    () => (type === 'create' ? t('addNewCourseType') : t('editCourseType')),
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
          // placeholder="Type Name"
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
          // placeholder="Type Price"
          block
        />
      </Form>
    </CRModal>
  );
}

NewCourseTypeDefinition.defaultProps = {
  type: 'create',
};

export default NewCourseTypeDefinition;
