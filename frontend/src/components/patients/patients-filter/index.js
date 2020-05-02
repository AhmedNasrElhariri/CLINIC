import React from 'react';
import {
  FormGroup,
  InputGroup,
  Icon,
  ControlLabel,
  Form,
  FormControl,
} from 'rsuite';

const PatientsFilter = ({ onNameChange }) => {
  return (
    <Form style={{ marginBottom: 30 }}>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <InputGroup style={{ width: 300 }}>
          <FormControl
            name="name"
            onChange={e => onNameChange(e)}
            autoComplete="off"
            size="sm"
          />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default PatientsFilter;
