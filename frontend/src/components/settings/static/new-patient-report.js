import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import Label from '../../widgets/label';
import Editor from './editor';
import { CRModal, CRTextInput, CRSelectInput } from 'components';

const model = Schema.Model({});
const contextData = [
  { id: 'patient', name: 'Patient' },
  { id: 'appointment', name: 'Appointment' },
  { id: 'surgeries', name: 'Surgeries' },
];
const patientValues = [
  { id: 1, value: 'name' },
  { id: 2, value: 'age' },
  { id: 3, value: 'phoneNo' },
];
const surgeriesValues = [
  { id: 1, value: 'name' },
  { id: 2, value: 'fees' },
  { id: 3, value: 'hospital_name' },
];
const appointmentValues = [
  { id: 1, value: 'date' },
  { id: 2, value: 'type' },
  { id: 3, value: 'session_Type' },
  { id: 4, value: 'patient_name' },
  { id: 5, value: 'patient_age' },
  { id: 6, value: 'patient_phoneNo' },
  { id: 7, value: 'branch_name' },
  { id: 8, value: 'doctor_name' },
];
const another = [{ id: 1, value: 'current_date' }];

function NewPatientReport({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () =>
      type === 'create' ? 'Add New Patient Report' : 'Edit Patient Report',
    [type]
  );

  const mentions = useMemo(() => {
    const context = formValue?.context;
    switch (context) {
      case 'patient':
        return patientValues;
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
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
      width={1000}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput label="Name" name="name" block />
        <CRSelectInput
          label="Context"
          name="context"
          block
          data={contextData}
        />
        <Label>Body</Label>
        {/* <ReactQuill
          name="body"
          theme='snow'
          style={{ marginTop: 10 }}
          value={formValue.body}
          onChange={value => onChange({ ...formValue, body: value })}
          modules={modules}
          onSelect={item => insertItem(item)}
        /> */}
        <Editor
          onChange={handleText}
          formValue={formValue}
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
