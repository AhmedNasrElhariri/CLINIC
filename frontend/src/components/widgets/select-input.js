import React from 'react';
import styled, { css } from 'styled-components';

import { FormGroup, FormControl, SelectPicker } from 'rsuite';
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

const ValueStyled = styled.div`
  background-color: #ffffff;

  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;

  display: flex;
  align-items: center;

  color: ${props => props.theme.colors.primary};

  ${byTheme(theme)}
`;

const ItemStyled = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  ${paddingLeft}

  & .rs-picker-select-menu-item {
    padding: 0;
  }

  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.texts[2]};
`;

const SelectPickerStyled = styled(SelectPicker)`
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
`;

const CustomSelect = ({ value, onChange, ...props }) => {
  return (
    <SelectPickerStyled
      {...props}
      value={value}
      onChange={onChange}
      renderValue={(_, __, label) => <ValueStyled>{label}</ValueStyled>}
      renderMenuItem={(label, { value: val }) => (
        <ItemStyled active={value === val}>{label}</ItemStyled>
      )}
      menuStyle={{ padding: 0, margin: 0, borderRadius: 10 }}
    ></SelectPickerStyled>
  );
};

export default ({ label, children, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomSelect} />
      {children}
    </FormGroup>
  );
};
