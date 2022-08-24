import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal } from 'components';
import { useTranslation } from 'react-i18next';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
});

export default function NewSpecialty({
  show,
  onCancel,
  onCreate,
  formValue,
  setFormValue,
  header
}) {
  const { t } = useTranslation();
  // useEffect(() => {
  //   if (!show) {
  //     setFormValue(initialValues);
  //   }
  // }, [show]);

  return (
    <CRModal
      show={show}
      header={t('newSpecialty')}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
      okTitle={t('ok')}
      cancelTitle={t('cancel')}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput label={t('name')} name="name" />
      </Form>
    </CRModal>
  );
}

NewSpecialty.propTypes = {};

NewSpecialty.defaultProps = {};
