import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import ReactQuill from 'react-quill';

import Quill from "quill";

import Label from '../../widgets/label';

import { CRModal, CRTextInput } from 'components';
import 'react-quill/dist/quill.snow.css';

const model = Schema.Model({});

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
//       console.log("Requesting a value: ", node.textContent);
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
}) {
  const header = useMemo(
    () =>
      type === 'create' ? 'Add New Patient Report' : 'Edit Patient Report',
    [type]
  );
  console.log(formValue,'ddd')
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
          modules={NewPatientReport.modules}
          formats={NewPatientReport.formats}
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
NewPatientReport.modules = {
  toolbar: [
    [{ 'header': [1, 2, false]}],
    [{ name: "PRE", tag: "PRE", prepare: "Pre" }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

NewPatientReport.formats = [
  'header',
  'PRE', 
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default NewPatientReport;
