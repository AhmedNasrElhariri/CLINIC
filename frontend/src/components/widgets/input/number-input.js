import React, { useCallback, memo } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { AddIcon, MinusIcon } from 'components/icons';
import {
  NumberContainerStyled,
  NumberInputStyled,
  NumberButton,
} from './style';

const CustomInput = memo(({ value, onChange, ...props }) => {
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
    <NumberContainerStyled>
      <NumberButton
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        onClick={() => setValue(Number(value || 0) - 1)}
      >
        <MinusIcon />
      </NumberButton>
      <NumberInputStyled
        value={value}
        onChange={onChangeValue}
        {...props}
      ></NumberInputStyled>
      <NumberButton
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        onClick={() => setValue(Number(value || 0) + 1)}
      >
        <AddIcon />
      </NumberButton>
    </NumberContainerStyled>
  );
});

const NumberInput = ({ label, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomInput} />
    </FormGroup>
  );
};

export default memo(NumberInput);
