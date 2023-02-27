import React, { memo } from 'react';

import { FormControl } from 'rsuite';
import { FormGroupStyled } from '../form-group';
import Label from '../label';
import { InputStyled, InputGroupStyled, AddOnStyle } from './style';

const CustomInput = memo(({ onChange, ...props }) => {
  return (
    <InputStyled
      onChange={e => onChange(e.target.value)}
      {...props}
      className="min-w-[7rem]"
    />
  );
});

const TextInput = ({
  label,
  layout,
  addOn,
  borderless = false,
  noLabel,
  ...rest
}) => {
  return (
    <FormGroupStyled layout={layout}>
      {!noLabel && <Label layout={layout}>{label}</Label>}
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl {...rest} accepter={CustomInput} addonAfter={!!addOn} />
        {addOn && <AddOnStyle>{addOn}</AddOnStyle>}
      </InputGroupStyled>
    </FormGroupStyled>
  );
};
TextInput.defaultProps = {
  layout: 'vertical',
};
export default memo(TextInput);
