import React from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { DatePickerStyled } from './style';

const CustomDatePicker = ({
  value,
  onChange,
  format = 'DD-MM-YYYY',
  ...props
}) => {
  return (
    <DatePickerStyled
      {...props}
      value={value}
      format={format}
      onChange={onChange}
      ranges={[]}
    ></DatePickerStyled>
  );
};

export default ({ label, children, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomDatePicker} placement="auto" />
      {children}
    </FormGroup>
  );
};
