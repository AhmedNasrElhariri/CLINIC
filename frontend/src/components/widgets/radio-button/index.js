import React, { memo } from 'react';
import { FormGroup, RadioGroup, Radio, FormControl } from 'rsuite';
import Label from '../label';

const CRRadio = ({ label, options, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl accepter={RadioGroup} {...rest}>
        {options.map(o => (
          <Radio value={o.value}>{o.name}</Radio>
        ))}
      </FormControl>
    </FormGroup>
  );
};

export default memo(CRRadio);
