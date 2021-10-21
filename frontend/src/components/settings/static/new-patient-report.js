import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import Label from '../../widgets/label';
import 'react-quill/dist/quill.snow.css';
import Editor from './editor';
import { useConfigurations, usePatientView } from 'hooks';
import { CRModal, CRTextInput, CRSelectInput } from 'components';
import {
  patientValues,
  appointmentValues,
  surgeriesValues,
  another,
  contextData,
} from 'services/constants';

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
}) {
  const header = useMemo(
    () =>
      type === 'create' ? 'Add New Patient Report' : 'Edit Patient Report',
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
      width={1000}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRTextInput
          label="Name"
          name="name"
          errorMessage={
            show && checkResult['name'].hasError
              ? checkResult['name'].errorMessage
              : ''
          }
          block
        />
        <Label>Body</Label>

        <CRSelectInput
          label="Context"
          name="context"
          block
          data={contextData}
        />
        <Label>Body</Label>
        <Editor
          onChange={handleText}
          formValue={formValue}
          pageSetupData={pageSetupData}
          mentionValues={mentions}
        />
      </Form>
    </CRModal>
  );
}

NewPatientReport.defaultProps = {
  type: 'create',
};

export default NewPatientReport;
