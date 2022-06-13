import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, CRSelectInput, Div, H3 } from 'components';
import { useImageCategory } from 'hooks';
import { useTranslation } from 'react-i18next';

function NewImageDefinition({
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
        ? t('addNewImageDefinition')
        : type === 'edit'
        ? t('editImageDefinition')
        : 'Delete Image Definition',
    [type]
  );
  const { imagesCategory } = useImageCategory();
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
            <H3>Are you sure that you want to delete the Image ? </H3>
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
              placeholder="Type Image"
              block
            />
            <CRSelectInput
              label={t('imageCategory')}
              name="categoryId"
              block
              data={imagesCategory}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewImageDefinition.defaultProps = {
  type: 'create',
};

export default NewImageDefinition;
