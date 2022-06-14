import React, { memo } from 'react';
import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import CustomFields from './custom';

const MultipleSelector = ({ label, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomFields} />
    </FormGroup>
  );
};

export default memo(MultipleSelector);
