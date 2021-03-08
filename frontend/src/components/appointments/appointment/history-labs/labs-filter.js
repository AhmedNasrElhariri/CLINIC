import React from 'react';
import { CRTextInput } from 'components';
import { Form } from 'rsuite';

const MedicineFilter = ({ onNameChange }) => {
  return (
    <Form style={{ width: '276px', marginBottom: '5px', marginLeft: '38px' }}>
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

export default MedicineFilter;
