import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRTextInput,
  CRSelectInput,
  CRNumberInput,
  Div,
  H3,
} from 'components';
import { useTranslation } from 'react-i18next';

const coursesType = [
  { name: 'Session', id: 'Session' },
  { name: 'Per Unit', id: 'Perunit' },
];
function NewCourseDefinition({
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
        ? t('addNewCourse')
        : type === 'edit'
        ? t('editCourse')
        : 'Delete Course',
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
            <H3>Are you sure that you want to delete the Course ? </H3>
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
              placeholder="Type Course"
              block
            />
            <CRSelectInput
              label={t('type')}
              name="type"
              errorMessage={
                show && checkResult['type'].hasError
                  ? checkResult['type'].errorMessage
                  : ''
              }
              block
              data={coursesType}
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
            <CRNumberInput
              label={t('numberofSessionsUnits')}
              name="units"
              errorMessage={
                show && checkResult['units'].hasError
                  ? checkResult['units'].errorMessage
                  : ''
              }
            />
            {formValue.type === 'Perunit' && (
              <CRTextInput
                label={t('messureOfUnits')}
                name="messureOfUnits"
                placeholder="Type Messure Of Units"
                block
              />
            )}
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewCourseDefinition.defaultProps = {
  type: 'create',
};

export default NewCourseDefinition;
