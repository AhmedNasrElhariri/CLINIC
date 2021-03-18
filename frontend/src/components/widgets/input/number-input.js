import React, { useCallback, memo } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { AddIcon, MinusIcon } from 'components/icons';
import {
  NumberContainerStyled,
  NumberInputStyled,
  NumberButton,
  StyledLabel,
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
      {props.title ? <StyledLabel>{props.title}</StyledLabel> : ''}
      <NumberButton
        borderRadius={'50%'}
        onClick={() => setValue(Number(value || 0) - 1)}
      >
        <MinusIcon style={{ width: '25px' }} />
      </NumberButton>
      <NumberInputStyled
        value={value}
        onChange={onChangeValue}
        {...props}
      ></NumberInputStyled>
      <NumberButton
        borderRadius={'50%'}
        onClick={() => setValue(Number(value || 0) + 1)}
      >
        <AddIcon style={{ width: '25px' }} />
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
