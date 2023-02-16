import React, { useCallback, memo, useState, useEffect } from 'react';
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
const CustomInput = memo(({ value, onChange, float, ...props }) => {
  const [internalValue, setInternalValue] = useState(value);
  const setValue = useCallback(val => onChange(val), [onChange]);
  const onChangeValue = useCallback(
    e => {
      let val = e.target.value;
      if (float && isFloat(val)) {
        setInternalValue(val);
        setValue(parseFloat(val));
      } else if (Number.isInteger(Number(val))) {
        val = Number(val);
        setInternalValue(val);
        setValue(val);
      }
    },
    [setValue, float]
  );

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

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
        value={internalValue}
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
