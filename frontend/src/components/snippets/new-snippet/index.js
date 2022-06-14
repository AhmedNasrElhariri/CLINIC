import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { Div } from 'components';
import { CRTextArea, CRTextInput, CRModal } from 'components';
import { useTranslation } from 'react-i18next';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

export default function NewSnippet({
  show,
  onCancel,
  onCreate,
  type,
  formValue,
  onChange,
}) {
  const { t } = useTranslation();
  const header = useMemo(
    () =>
      type === 'create'
        ? t('addNewSnippet')
        : type === 'edit'
        ? t('editSnippet')
        : t('deleteSnippet'),
    [type]
  );
  return (
    <CRModal
      show={show}
      header={header}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form fluid model={model} formValue={formValue} onChange={onChange}>
        {type === 'delete' ? (
          <Div>{t('deleteSnippetMessage')}</Div>
        ) : (
          <>
            <CRTextInput label={t('title')} name="title" />
            <CRTextArea label={t('body')} name="body"></CRTextArea>
          </>
        )}
      </Form>
    </CRModal>
  );
}
