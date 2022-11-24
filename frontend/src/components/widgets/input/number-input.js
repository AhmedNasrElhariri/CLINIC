import React, { useCallback, memo } from 'react';
import * as R from 'ramda';
import { FormControl } from 'rsuite';

import Label from '../label';
import { AddIcon, MinusIcon } from 'components/icons';
import {
  NumberContainerStyled,
  NumberInputStyled,
  NumberButton,
} from './style';
import { FormGroupStyled } from '../form-group';
import { isFloat } from 'utils/nubmer';

const CustomInput = memo(({ value, onChange, ...props }) => {
  const setValue = useCallback(val => onChange(Number(val)), [onChange]);
  const onChangeValue = useCallback(
    e => {
      const val = e.target.value;
      if (R.isEmpty(val) || R.isNil(val)) {
        setValue('');
      }
      if (isFloat(val)) {
        setValue(val);
      }
    },
    [setValue]
  );

  return (
    <NumberContainerStyled>
      <NumberButton
        borderRadius={'50%'}
        onClick={() => setValue(Number(value || 0) - 1)}
        variant="light"
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
        variant="light"
      >
        <AddIcon style={{ width: '25px' }} />
      </NumberButton>
    </NumberContainerStyled>
  );
});

const NumberInput = ({
  label,
  layout,
  formGroupClassName,
  noLabel,
  ...rest
}) => {
  return (
    <FormGroupStyled layout={layout} className={formGroupClassName}>
      {!noLabel && <Label layout={layout}>{label}</Label>}
      <FormControl {...rest} accepter={CustomInput} />
    </FormGroupStyled>
  );
};

NumberInput.defaultProps = {
  layout: 'vertical',
};

export default memo(NumberInput);
