import React from 'react';
import { CRTextInput, Div } from 'components';
import { Form } from 'rsuite';

const PatientsFilter = ({ formValue, setFormValue }) => {
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3}>
          <CRTextInput label="Name" name="name" placeholder="Search" width={300}/>
        </Div>
        <CRTextInput label="Phone Number" name="phoneNo" placeholder="Search" width={300}/>
      </Div>
    </Form>
  );
};

export default PatientsFilter;
