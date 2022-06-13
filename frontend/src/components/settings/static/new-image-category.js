import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, Div, H3 } from 'components';
import { useTranslation } from 'react-i18next';

const model = Schema.Model({});
function NewImageCategory({
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
        ? t('addNewImageCategory')
        : type === 'edit'
        ? t('editImageCategory')
        : 'Delete Image Category',
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
            <H3>
              Are you sure that you want to delete the Image Category and all
              related images ?{' '}
            </H3>
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
              placeholder="Type Name"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewImageCategory.defaultProps = {
  type: 'create',
};

export default NewImageCategory;
