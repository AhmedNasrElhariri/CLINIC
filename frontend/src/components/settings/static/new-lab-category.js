import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput, Div, H3 } from 'components';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

function NewLabCategory({
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
        ? t('addNewLabCategory')
        : type === 'edit'
        ? t('editLabCategory')
        : 'Delete Lab Category',
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
              Are you sure that you want to delete the Lab Category and all
              related labs ?{' '}
            </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label={t('labCategory')}
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewLabCategory.defaultProps = {
  type: 'create',
};

export default NewLabCategory;
