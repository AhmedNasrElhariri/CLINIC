import React, { useMemo } from 'react';
import { Form, InputNumber, Toggle } from 'rsuite';
import { CRModal, CRNumberInput, CRTextInput, CRLabel, Div } from 'components';
import { useTranslation } from 'react-i18next';


function NewSessionDefinition({
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
        ? t('addNewSessionDefinition')
        : t('editSessionDefinition'),
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
        <CRLabel>{t('price')}</CRLabel>
        <InputNumber
          // defaultValue={0.01}
          // step={0.01}
          value={formValue.price}
          onChange={val => {
            onChange({ ...formValue, price: val });
          }}
          errorMessage={
            show && checkResult['price'].hasError
              ? checkResult['price'].errorMessage
              : ''
          }
          // placeholder="Type Price"
        />
        <CRNumberInput
          label={t('duration')}
          name="duration"
          // placeholder="Type Duration"
          block
        />
        <Div mt="20px">
          <label>Follow Up or not: </label>
          <Toggle onChange={val => onChange({ ...formValue, followUp: val })} />
        </Div>
        {formValue.followUp && (
          <CRNumberInput
            label="Timer"
            name="timer"
            placeholder="Type Timer"
            block
          />
        )}
      </Form>
    </CRModal>
  );
}

NewSessionDefinition.defaultProps = {
  type: 'create',
};

export default NewSessionDefinition;
