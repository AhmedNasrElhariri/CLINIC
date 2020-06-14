import React from 'react';
import styled, { css } from 'styled-components';

import { FormGroup, FormControl, ControlLabel, DatePicker } from 'rsuite';
import { byTheme } from 'services/theme';
import Label from './label';

const theme = {
  fontSize: {
    normal: 18,
    large: 22,
  },

  height: {
    normal: 48,
    large: 59,
  },
  borderRadius: {
    normal: 10,
    large: 10,
  },
};

const paddingLeft = css`
  padding-left: 22px;
`;

const DatePickerStyled = styled(DatePicker)`
  & a.rs-picker-toggle.rs-btn {
    padding: 0;
    ${paddingLeft}
    display: flex;
    align-items: center;
    ${byTheme(theme)}
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
  }
`;

const CustomDatePicker = ({
  value,
  onChange,
  format = 'DD-MM-YYYY',
  ...props
}) => {
  return (
    <DatePickerStyled
      {...props}
      value={value}
      format={format}
      onChange={onChange}
      ranges={[]}
    ></DatePickerStyled>
  );
};

export default ({ label, children, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomDatePicker} />
      {children}
    </FormGroup>
  );
};
