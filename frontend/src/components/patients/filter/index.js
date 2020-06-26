import React from 'react';
import { CRTextInput } from 'components';
import { Form } from 'rsuite';

const PatientsFilter = ({ onNameChange }) => {
  return (
    <Form style={{ width: 276, marginBottom: 64 }}>
      <CRTextInput
        name="name"
        placeholder="Search"
        onChange={e => onNameChange(e)}
      >
        search
      </CRTextInput>
    </Form>
  );
};

export default PatientsFilter;
