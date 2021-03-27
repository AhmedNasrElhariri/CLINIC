import React, { memo } from 'react';

import { FormControl, InputGroup, Icon } from 'rsuite';
import { FormGroupStyled } from '../form-group';
import Label from '../label';
import { InputStyled, InputGroupStyled } from './style';

const CustomInput = memo(({ onChange, ...props }) => {
  return <InputStyled onChange={e => onChange(e.target.value)} {...props} />;
});

const TextInput = ({
  label,
  layout,
  children,
  borderless = false,
  ...rest
}) => {
  return (
    <FormGroupStyled>
      <Label layout={layout}>{label}</Label>
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl {...rest} accepter={CustomInput} addonAfter={!!children} />
        {children && (
          <InputGroup.Addon style={{ width: 59 }}>
            <Icon icon={children} />
          </InputGroup.Addon>
        )}
      </InputGroupStyled>
    </FormGroupStyled>
  );
};

export default memo(TextInput);
