import React, { useCallback, memo } from 'react';
import { FormGroup, FormControl, CheckboxGroup, Checkbox } from 'rsuite';

import Label from '../label';

const CustomInput = memo(({ value, max, onChange, options, ...props }) => {
  const handleChange = useCallback(val => {
    onChange(val.slice(Math.max(val.length - (max || Infinity), 0)));
  }, []);

  return (
    <CheckboxGroup value={value || []} onChange={handleChange} {...props}>
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
