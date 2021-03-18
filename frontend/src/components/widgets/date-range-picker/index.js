import React from 'react';
import styled, { css } from 'styled-components';

import { FormGroup, FormControl, DateRangePicker } from 'rsuite';
import Label from '../label';

const smallStyle = css`
  font-size: 18px;
  height: 42px;
  border-radius: 10px;
`;

const largeStyle = css`
  font-size: 22px;
  height: 35px;
  border-radius: 0px;
`;

const paddingLeft = css`
  padding-left: 22px;
`;

const DateRangePickerStyled = styled(DateRangePicker)`
  & a.rs-picker-toggle.rs-btn {
    padding: 0;
    ${paddingLeft}
    display: flex;
    align-items: center;
    ${props => (props.small ? smallStyle : largeStyle)}
    &:focus,
    &:active,
    &:hover,
    &:visited {
      border: solid 1px ${props => props.theme.colors.primary};
    }
  }
  & a .rs-picker-toggle-value {
    color: ${props => props.theme.colors.primary} !important;
  }
  & .rs-picker-toggle-caret {
    color: ${props => props.theme.colors.text} !important;
    top: auto !important;
  }
`;

const CustomDatePicker = ({
  value,
  onChange,
  format = 'DD-MM-YYYY',
  ...props
}) => {
  return (
    <DateRangePickerStyled
      {...props}
      value={value}
      format={format}
      onChange={onChange}
      ranges={[]}
    ></DateRangePickerStyled>
  );
};

export default ({ label, noLabel, children, ...rest }) => {
  return (
    <FormGroup>
      <Label noLabel={noLabel}>{label}</Label>
      <FormControl {...rest} accepter={CustomDatePicker} />
      {children}
    </FormGroup>
  );
};
