import React from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { TextAreaStyled, InputGroupStyled } from './style';

const CustomInput = ({ onChange, ...props }) => {
  return <TextAreaStyled onChange={e => onChange(e.target.value)} {...props} />;
};

export default ({ label, children, borderless = false, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl {...rest} accepter={CustomInput} rows={5} />
      </InputGroupStyled>
    </FormGroup>
  );
};
