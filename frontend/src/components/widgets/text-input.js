import React from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from './label';
import { InputStyled } from './input.styles';

const CustomInput = ({ onChange, ...props }) => {
  return <InputStyled onChange={e => onChange(e.target.value)} {...props}  />;
};

export default ({ label, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomInput} />
    </FormGroup>
  );
};
