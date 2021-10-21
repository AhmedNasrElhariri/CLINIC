import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import ReactQuill from 'react-quill';

import Label from '../../widgets/label';

import { CRModal, CRTextInput } from 'components';
import 'react-quill/dist/quill.snow.css';

// const BlockEmbed = Quill.import("blots/block/embed");

//   class CustomCode extends BlockEmbed {
//     static create(value) {
//       let node = super.create(value);
//       const code = document.createElement("code");
//       code.innerHTML = value;
//       node.appendChild(code);
//       return node;
//     }

//     static value(node) {
//       return node.textContent;
//     }
//   }

//   CustomCode.blotName = "code-custom";
// ReactQuill.tagName = "pre";
// ReactQuill.className = "ql-syntax";

// Quill.register(CustomCode);

/*
 * In order to try out the "custom code" functionality, click
 * "Code" button in the editor's toolbar and paste/type your snippet,
 * then hit ok.
 * Here's an example: function something() {console.log('It works');}
 */

// new Quill("#editor", {
//   modules: {
//     toolbar: {
//       container: ["code-custom"]
//     }
//   },
//   theme: "snow"
// })

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
        <ReactQuill
          name="body"
          style={{ marginTop: 10 }}
          value={formValue.body}
          onChange={value => onChange({ ...formValue, body: value })}
        />
      </Form>
    </CRModal>
  );
}

NewPatientReport.defaultProps = {
  type: 'create',
};

export default NewPatientReport;
