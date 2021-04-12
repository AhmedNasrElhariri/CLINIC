import React, { memo } from 'react';
import { FormGroup, FormControl } from 'rsuite';
import { CheckboxGroup, Checkbox } from 'rsuite';
import Label from '../label';

const CustomInput = memo(({ value, onChange, options, ...props }) => {
  return (
    <CheckboxGroup value={value || []} onChange={onChange} {...props}>
      {options.map((o, index) => (
        <Checkbox key={index} value={o.value || o}>
          {o.name || o}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
});

const CRCheckBoxGroup = ({ label, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomInput} />
    </FormGroup>
  );
};

export default memo(CRCheckBoxGroup);
