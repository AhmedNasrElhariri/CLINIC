import React, { useCallback } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { CRButton } from 'components';
import { AddIcon, MinusIcon } from 'components/icons';
import { NumberContainerStyled, NumberInputStyled } from './style';

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
    <NumberContainerStyled>
      <CRButton
        minWidth={98}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        onClick={() => setValue(Number(value || 0) - 1)}
      >
        <MinusIcon />
      </CRButton>
      <NumberInputStyled
        value={value}
        onChange={onChangeValue}
        {...props}
      ></NumberInputStyled>
      <CRButton
        minWidth={98}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        onClick={() => setValue(Number(value || 0) + 1)}
      >
        <AddIcon />
      </CRButton>
    </NumberContainerStyled>
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
