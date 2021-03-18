import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { space, typography, layout, border } from 'styled-system';

import { Input, InputGroup } from 'rsuite';
import { byTheme } from 'services/theme';
import CRButton from 'components/widgets/button';
import stCss from '@styled-system/css';

const fontTheme = {
  fontSize: {
    normal: 14,
    large: 22,
  },
};

const heightTheme = {
  height: {
    normal: 35,
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

// const getBorderRadius = ({ noRadius, round }) =>
//   noRadius
//     ? noBorderRadius
//     : round
//     ? byTheme(roundBorderRadius)
//     : byTheme(normalBorderRadius);

const inputCss = css`
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
  border-radius: 17px;
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
  ${inputCss}
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
    ${getBorder}
    width:100% !important;
  }

  &.rs-input-group {
    border-radius: 0px;
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
  ${byTheme(heightTheme)}
  box-sizing: content-box;
`;

export const NumberInputStyled = styled.input`
  ${inputCss};
  width: 100%;
  height: 35px;
  padding: 7px 13px 7px 14px;
  object-fit: contain;
  border: solid 1px #eef1f1;
  background-color: #ffffff;
  border-radius: 0px;
  text-align: center;
  margin: 0px 14px;
`;

export const TextAreaStyled = styled.textarea`
  ${inputCss}
  resize: none;
`;
export const StyledLabel = styled.p`
  width: 31px;
  height: 19px;
  margin: auto 10px;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #283148;
`;

export const NumberButton = styled(CRButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 7px 6.4px 6.4px 6.9px;
  ${stCss({
    width: 27,
    height: 27,
  })}
`;

export const ImportButtonStyled = styled.span`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 4px 6px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  top: 4px;
`;
