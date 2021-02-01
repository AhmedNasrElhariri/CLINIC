import React from 'react';
import { FormGroup, Checkbox } from 'rsuite';

export default ({
  label,
  value,
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
        value={value}
        {...rest}
        style={{ width: '100%' }}
        checked={formValue[name]}
        onChange={onChange}
      />
    </FormGroup>
  );
};
