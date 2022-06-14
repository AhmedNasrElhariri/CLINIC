import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import Label from '../../widgets/label';
import Editor from './editor';
import { useConfigurations, usePatientView } from 'hooks';
import { CRModal, CRTextInput, CRSelectInput, Div, H3 } from 'components';
import {
  patientValues,
  appointmentValues,
  surgeriesValues,
  another,
  contextData,
} from 'services/constants';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

function NewPatientReport({
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
        ? t('addNewPatientReport')
        : type === 'edit'
        ? t('editPatientReport')
        : 'Delete Patient Report',
    [type]
  );
  const { pageSetupData } = useConfigurations();
  const { userPatientFields } = usePatientView();
  const patientMentionsValue = useMemo(() => {
    const fields = userPatientFields.map(pF => {
      return { id: pF.id, value: pF.field.name };
    });
    const allFields = patientValues.concat(fields);
    return allFields;
  }, [userPatientFields]);
  const mentions = useMemo(() => {
    const context = formValue?.context;
    switch (context) {
      case 'patient':
        return patientMentionsValue;
      case 'appointment':
        return appointmentValues;
      case 'surgeries':
        return surgeriesValues;
      default:
        return another;
    }
  }, [formValue.context]);
  const handleText = content => {
    onChange({ ...formValue, body: content });
  };
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
      width={1000}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the Patient Report ? </H3>
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
              block
            />
            <CRSelectInput
              label={t('contextData')}
              name="context"
              block
              data={contextData}
            />
            <Label>{t('body')}</Label>
            <Editor
              onChange={handleText}
              formValue={formValue}
              pageSetupData={pageSetupData}
              mentionValues={mentions}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewPatientReport.defaultProps = {
  type: 'create',
};

export default NewPatientReport;
