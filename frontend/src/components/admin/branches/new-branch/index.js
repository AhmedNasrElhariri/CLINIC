import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { CRTextInput, CRModal, CRTextArea } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
});

const initialValues = {
  name: '',
  address: '',
  phoneNo: '',
  notes: '',
};

export default function NewBranch({ show, onCancel, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);
  const { t } = useTranslation();
  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

  return (
    <CRModal
      show={show}
      header={t('newBranch')}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
      okTitle={t('ok')}
      cancelTitle={t('cancel')}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput label={t('name')} name="name" />
        <CRTextInput label={t('address')} name="address" />
        <CRTextInput label={t('phoneNo')} name="phoneNo" />
        <CRTextArea label={t('notes')} name="notes"></CRTextArea>
      </Form>
    </CRModal>
  );
}

NewBranch.propTypes = {};

NewBranch.defaultProps = {};
