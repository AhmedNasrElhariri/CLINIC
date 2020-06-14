import React, { useCallback } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from './label';
import { Div, CRButton } from 'components';
import { InputStyled } from './input.styles';
import { AddIcon } from 'components/icons';

const CustomInput = ({ value, onChange, ...props }) => {
  const setValue = useCallback(val => onChange(val), [onChange]);

  const onChangeValue = useCallback(
    e => {
      const val = Number(e.target.value);
      if (Number.isInteger(val)) {
        setValue(val);
      }
    },
    [setValue]
  );

  return (
    <Div display="flex">
      <CRButton
        minWidth={98}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        onClick={() => setValue(Number(value) - 1)}
      >
        <AddIcon />
      </CRButton>
      <InputStyled
        value={value}
        onChange={onChangeValue}
        {...props}
        noRadius
      ></InputStyled>
      <CRButton
        minWidth={98}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        onClick={() => setValue(Number(value) + 1)}
      />
    </Div>
  );
};

export default ({ label, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomInput} />
    </FormGroup>
  );
};
