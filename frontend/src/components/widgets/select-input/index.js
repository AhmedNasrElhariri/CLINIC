import React from 'react';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import { FormControl, SelectPicker } from 'rsuite';
import { byTheme } from 'services/theme';

import Label from '../label';
import { FormGroupStyled } from '../form-group';

const heightTheme = {
  height: {
    normal: 35,
    large: 59,
  },
};

const fontTheme200 = {
  fontSize: {
    normal: 12,
    large: 22,
  },
  lineHeight: {
    normal: 1.33,
    large: 1.44,
  },
  color: {
    normal: '#a6abab',
    large: '#a6abab',
  },
};

const paddingLeft = css`
  padding-left: 22px;
`;

const borderCss = css`
  border: solid 1px ${props => props.theme.colors.primary} !important;
`;

// const ValueStyled = styled.div`
//   background-color: #ffffff;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.35;
//   letter-spacing: normal;
//   text-align: left;
//   display: flex;
//   align-items: center;
//   color: ${props => props.theme.colors.primary};
//   ${byTheme(theme)}
// `;

const ItemStyled = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 18px;
  ${paddingLeft}
  ${byTheme(fontTheme200)}
  & .rs-picker-select-menu-item {
    padding: 0;
  }
  ${byTheme(fontTheme200)}
  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.texts[1]};

  & input.rs-picker-search-bar-input {
    ${borderCss}
    &:focus,
    &:active,
    &:hover,
    &:visited {
    }
  }
`;

const SelectPickerStyled = styled(SelectPicker)`
  & a.rs-picker-toggle.rs-btn {
    padding: 0;
    ${paddingLeft}
    display: flex;
    align-items: center;
    border-radius: 0px;
    float: right;
    ${byTheme(heightTheme)}
    &:focus,
    &:active,
    &:hover,
    &:visited {
      ${borderCss}
    }
  }

  & a.rs-picker-toggle.active {
    ${borderCss}
  }
  ${createGlobalStyle`
    .cr-picker{
      & .rs-picker-search-bar-input{
        height: 45px;
        border-radius: 10px !important;
        font-size: 18px !important;
        color: ${props => props.theme.colors.text} !important;

        &:focus,
        &:active,
        &:hover,
        &:visited {
          outline: none;
          border: solid 1px ${props => props.theme.colors.primary} !important;
        }
      }

      & .rs-picker-search-bar::after{
        top: 20px !important;
      }
      
    }
    &.rs-picker-menu.rs-picker-select-menu{
      margin-top: 35px;
      padding-top:0px;
      border-radius: 0px;
    }
  `}
`;

const CustomSelect = ({ value, label, onChange, ...props }) => {
  return (
    <SelectPickerStyled
      {...props}
      value={value}
      onChange={onChange}
      menuClassName="cr-picker"
      virtualized={false}
      renderMenuItem={(label, { value: val }) => (
        <ItemStyled active={value === val}>{label}</ItemStyled>
      )}
      menuStyle={{
        borderRadius: 10,
      }}
    />
  );
};

export default ({ label, layout, children, ...rest }) => {
  return (
    <FormGroupStyled layout={layout}>
      <Label>{label}</Label>
      <FormControl {...rest} accepter={CustomSelect} />
      {children}
    </FormGroupStyled>
  );
};
