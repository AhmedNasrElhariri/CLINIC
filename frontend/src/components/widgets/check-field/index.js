import React from 'react';
import { FormGroup, Checkbox, FormControl } from 'rsuite';
import { ControlLabelStyled } from './style';

export default ({
  label,
  inline = true,
  block = false,
  formValue,
  onChange,
  name,
  ...rest
}) => {
  return (
    <FormGroup style={{ marginBottom: 12 }}>
      <Checkbox
        name={name}
        {...rest}
        style={{ width: '100%' }}
        checked={formValue[name]}
        onChange={onChange}
      />
    </FormGroup>
  );
};
