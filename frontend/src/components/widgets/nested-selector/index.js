import React, { memo } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import CustomCascader from './custom';

const NestedSelector = ({ label, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomCascader} />
    </FormGroup>
  );
};

export default memo(NestedSelector);
