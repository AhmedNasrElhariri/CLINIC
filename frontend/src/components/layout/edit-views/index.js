import React from 'react';
import FormBuilder from 'react-form-builder2';

export default function Sidebar() {
  const onChange = (a, b) => console.log(a, b);
  return (
    <div>
      <FormBuilder.ReactFormBuilder
        url="path/to/GET/initial.json"
        onChange={onChange}
      />
      ,
    </div>
  );
}
