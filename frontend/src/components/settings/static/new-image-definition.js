import React, { useMemo } from "react";
import { Form, Schema } from "rsuite";

import { CRModal, CRTextInput } from "components";

const model = Schema.Model({});

function NewImageDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === "create" ? "Add New Image" : "Edit Image "),
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput
          label="Image Name"
          name="imageName"
          placeholder="Type Image"
          block
        />
      </Form>
    </CRModal>
  );
}

NewImageDefinition.defaultProps = {
  type: "create",
};

export default NewImageDefinition;
