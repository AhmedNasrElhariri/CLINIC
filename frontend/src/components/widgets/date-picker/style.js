import styled, { css } from 'styled-components';

import { DatePicker } from 'rsuite';
import { byTheme } from 'services/theme';

const theme = {
  fontSize: {
    normal: 18,
    large: 22,
  },

  height: {
    normal: 35,
    large: 59,
  },
  borderRadius: {
    normal: 10,
    large: 17,
  },
};

const paddingLeft = css`
  padding-left: 22px;
`;

export const DatePickerStyled = styled(DatePicker)`
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
  && a.rs-picker-toggle.rs-btn{
    border-radius: 0px;
  }
`;
