import React, { memo } from 'react';

import { FormControl } from 'rsuite';
import { FormGroupStyled } from '../form-group';
import Label from '../label';
import { InputStyled, InputGroupStyled, AddOnStyle } from './style';

const CustomInput = memo(({ onChange, ...props }) => {
  return <InputStyled onChange={e => onChange(e.target.value)} {...props} />;
});

const TextInput = ({ label, layout, addOn, borderless = false, ...rest }) => {
  return (
    <FormGroupStyled>
      <Label layout={layout}>{label}</Label>
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl {...rest} accepter={CustomInput} addonAfter={!!addOn} />
        {addOn && <AddOnStyle>{addOn}</AddOnStyle>}
      </InputGroupStyled>
    </FormGroupStyled>
  );
};

export default memo(TextInput);
