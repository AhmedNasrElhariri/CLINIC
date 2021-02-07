import React, { useMemo } from "react";
import { Form, Schema } from "rsuite";
import ReactQuill from "react-quill";
import Label from "../../widgets/label";

import { CRModal, CRTextInput } from "components";
import "react-quill/dist/quill.snow.css";
import { marginBottom } from "styled-system";

const model = Schema.Model({});

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
      type === "create" ? "Add New Patient Report" : "Edit Patient Report",
    [type]
  );

  console.log(formValue);
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
        <Label>Body</Label>
        <ReactQuill
          theme="snow"
          name="body"
          style={{ marginTop: 10 }}
          value={formValue.body}
          onChange={(value) => onChange(formValue, (formValue["body"] = value))}
        />
      </Form>
    </CRModal>
  );
}

NewPatientReport.defaultProps = {
  type: "create",
};

export default NewPatientReport;
