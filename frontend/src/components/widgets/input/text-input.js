import React, { memo } from 'react';

import { FormGroup, FormControl, InputGroup, Icon } from 'rsuite';
import Label from '../label';
import { InputStyled, InputGroupStyled } from './style';

const CustomInput = memo(({ onChange, ...props }) => {
  return <InputStyled onChange={e => onChange(e.target.value)} {...props} />;
});

const TextInput = ({ label, children, borderless = false, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl {...rest} accepter={CustomInput} addonAfter={!!children} />
        {children && (
          <InputGroup.Addon style={{ width: 59 }}>
            <Icon icon={children} />
          </InputGroup.Addon>
        )}
      </InputGroupStyled>
    </FormGroup>
  );
};

export default memo(TextInput);
