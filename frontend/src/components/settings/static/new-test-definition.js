import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput, Div, H3 } from 'components';
import { useLabCategory } from 'hooks';
import { useTranslation } from 'react-i18next';

function NewLabDefinition({
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
        ? t('addNewLabDefinition')
        : type === 'edit'
        ? t('editLabDefinition')
        : 'Delete Lab Definition',
    [type]
  );
  const { labsCategory } = useLabCategory();
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
            <H3>Are you sure that you want to delete the Lab ? </H3>
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
              placeholder="Type Lab"
              block
            />
            <CRSelectInput
              label={t('labCategory')}
              name="categoryId"
              block
              data={labsCategory}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewLabDefinition.defaultProps = {
  type: 'create',
};

export default NewLabDefinition;
