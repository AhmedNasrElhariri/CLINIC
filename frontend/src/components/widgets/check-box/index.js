import React, { memo } from 'react';
import { FormGroup, FormControl } from 'rsuite';
import { Checkbox } from 'rsuite';
import Label from '../label';

const CRCheckBox = ({ label, value, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} checked={value} accepter={Checkbox} />
    </FormGroup>
  );
};

export default memo(CRCheckBox);
