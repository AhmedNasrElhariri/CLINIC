import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { space, typography, layout, border } from 'styled-system';

import { Input, InputGroup } from 'rsuite';
import { byTheme } from 'services/theme';

const fontTheme = {
  fontSize: {
    normal: 18,
    large: 22,
  },
};

const heightTheme = {
  height: {
    normal: 48,
    large: 59,
  },
};

const roundBorderRadius = {
  borderRadius: {
    normal: 10,
    large: 57,
  },
};

const normalBorderRadius = {
  borderRadius: {
    normal: 10,
    large: 17,
  },
};

const noBorderRadius = {
  borderRadius: 0,
};

const getBorder = ({ borderless, theme }) => {
  return {
    border: borderless ? 'none' : `1px solid ${theme.colors.borders[0]}`,
  };
};

const getBorderRadius = ({ noRadius, round }) =>
  noRadius
    ? noBorderRadius
    : round
    ? byTheme(roundBorderRadius)
    : byTheme(normalBorderRadius);

const InputCss = css`
  background-color: #ffffff;
  width: 100%;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  padding: 16px 32px;
  color: ${props => props.theme.colors.text};
  border: none;
  ${space}
  ${typography}
  ${layout}
  ${border}
  ${byTheme(fontTheme)}
  &:focus,
  &:active,
  &:hover,
  &:visited {
    outline: none;
  }
`;

export const InputStyled = styled.input`
  ${InputCss}
  ${byTheme(heightTheme)}
  ${({ addonAfter }) =>
    addonAfter
      ? {
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
        }
      : {}}
`;

Input.propTypes = {
  noRadius: PropTypes.bool,
  round: PropTypes.bool,
  addonAfter: PropTypes.bool,
  borderless: PropTypes.bool,
};

Input.defaultProps = {
  noRadius: false,
  round: false,
  addonAfter: false,
  borderless: false,
};

export const InputGroupStyled = styled(InputGroup)`
  &.rs-input-group {
    ${getBorderRadius}
    ${getBorder}
  }

  &.rs-input-group {
    &:focus,
    &:active,
    &:hover,
    &:visited {
      outline: none;
      border: solid 1px ${props => props.theme.colors.primary} !important;
    }
  }
`;

export const NumberContainerStyled = styled.div`
  display: flex;
  border-radius: 17px;
  border: 1px solid ${props => props.theme.colors.borders[0]};
  ${byTheme(heightTheme)}
  box-sizing: content-box;
`;

export const NumberInputStyled = styled.input`
  ${InputCss}
`;

export const TextAreaStyled = styled.textarea`
  ${InputCss}
  resize: none;
`;
