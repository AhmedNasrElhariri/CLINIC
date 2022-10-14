import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import { FormControl, SelectPicker } from 'rsuite';
import { byTheme } from 'services/theme';

import Label from '../label';
import { FormGroupStyled } from '../form-group';
import { useTranslation } from 'react-i18next';

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
    direction: ltr;
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

const CustomSelect = ({
  value,
  label,
  onChange,
  labelKey,
  valueKey,
  data,
  sameValue,
  ...props
}) => {
  const internalValue = useMemo(
    () => (sameValue && value ? value[valueKey] : value),
    [sameValue, value, valueKey]
  );

  const handleChange = useCallback(
    val => {
      const formVal = sameValue ? data.find(d => d[valueKey] === val) : val;
      onChange(formVal);
    },
    [data, onChange, sameValue, valueKey]
  );

  return (
    <SelectPickerStyled
      {...props}
      value={internalValue}
      onChange={handleChange}
      labelKey={labelKey}
      valueKey={valueKey}
      data={data}
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

const CRSelectInput = ({
  label,
  labelKey,
  valueKey,
  layout,
  children,
  noLabel,
  formGroupClassName,
  ...rest
}) => {
  const { t } = useTranslation();
  const placeho = t('select');
  return (
    <FormGroupStyled layout={layout} className={formGroupClassName}>
      {!noLabel && <Label>{label}</Label>}
      <FormControl
        {...rest}
        accepter={CustomSelect}
        labelKey={labelKey}
        valueKey={valueKey}
        placeholder={placeho}
      />
      {children}
    </FormGroupStyled>
  );
};

CRSelectInput.defaultProps = {
  labelKey: 'name',
  valueKey: 'id',
  sameValue: false,
};

export default CRSelectInput;
