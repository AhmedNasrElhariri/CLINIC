import React, { useCallback, memo } from "react";
import * as R from "ramda";
import { FormControl } from "rsuite";

import Label from "../label";
import { AddIcon, MinusIcon } from "components/icons";
import {
  NumberContainerStyled,
  NumberInputStyled,
  NumberButton,
} from "./style";
import { FormGroupStyled } from "../form-group";
import { formatNumber, isFloat, unmask } from "utils/nubmer";

const CustomInput = memo(({ value, onChange, ...props }) => {
  const onChangeValue = useCallback(
    (e) => {
      console.log(e);
      const val = Number(e.target.value);
      console.log(val);
      if (R.isEmpty(val) || R.isNil(val)) {
        onChange("");
      }
      if (isFloat(val)) {
        onChange(val);
      }
    },
    [onChange]
  );

  return (
    <NumberContainerStyled>
      <NumberButton
        borderRadius={"50%"}
        onClick={() => onChange(parseFloat(value) - 1)}
        variant="light"
      >
        <MinusIcon style={{ width: "25px" }} />
      </NumberButton>
      <NumberInputStyled
        value={formatNumber(value)}
        onChange={onChangeValue}
        {...props}
      ></NumberInputStyled>
      <NumberButton
        borderRadius={"50%"}
        onClick={() => onChange(parseFloat(value) + 1)}
        variant="light"
      >
        <AddIcon style={{ width: "25px" }} />
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
  layout: "vertical",
};

export default memo(NumberInput);
