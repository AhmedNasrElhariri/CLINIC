import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRTextInput, Div, H3 } from 'components';
import { useTranslation } from 'react-i18next';

function NewTiming({
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
        ? t('addNewTiming')
        : type === 'edit'
        ? t('editTiming')
        : 'Delete Timing',
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
            <H3>Are you sure that you want to delete the Timing ? </H3>
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
              placeholder="Name"
              block
            />
            <CRTextInput
              label={t('englishPrintValue')}
              name="englishPrintValue"
              errorMessage={
                show && checkResult['englishPrintValue'].hasError
                  ? checkResult['englishPrintValue'].errorMessage
                  : ''
              }
              block
            />
            <CRTextInput
              label={t('arabicPrintValue')}
              name="arabicPrintValue"
              errorMessage={
                show && checkResult['arabicPrintValue'].hasError
                  ? checkResult['arabicPrintValue'].errorMessage
                  : ''
              }
              placeholder="Print Value"
              block
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewTiming.defaultProps = {
  type: 'create',
};

export default NewTiming;
