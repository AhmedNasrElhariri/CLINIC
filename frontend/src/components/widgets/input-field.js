import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'rsuite';

export default ({ label, ...rest }) => {
  return (
    <FormGroup style={{ marginBottom: 12 }}>
      <FormControl {...rest} style={{ width: '100%' }} />
    </FormGroup>
  );
};
