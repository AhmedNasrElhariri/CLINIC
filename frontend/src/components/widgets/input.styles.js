import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, typography, layout, border } from 'styled-system';

import { Input } from 'rsuite';
import { byTheme } from 'services/theme';

const theme = {
  fontSize: {
    normal: 18,
    large: 22,
  },

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
    large: 10,
  },
};

const noBorderRadius = {
  borderRadius: 0,
};

const getBorderRadius = ({ noRadius, round }) =>
  noRadius
    ? noBorderRadius
    : round
    ? byTheme(roundBorderRadius)
    : byTheme(normalBorderRadius);

export const InputStyled = styled.input` 
  background-color: #ffffff;
  width:100%;
  border: 1px solid ${props => props.theme.colors.borders[0]};

  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  padding: 16px 32px;
  color: ${props => props.theme.colors.text};

  ${space}
  ${typography}
  ${layout}

  ${byTheme(theme)}

  ${getBorderRadius}
  ${border}

  &:focus,
  &:active,
  &:hover,
  &:visited {
    outline: none;
    border: solid 1px ${props => props.theme.colors.primary};
  }
`;

Input.propTypes = {
  noRadius: PropTypes.bool,
  round: PropTypes.bool,
};

Input.defaultProps = {
  noRadius: false,
  round: false,
};
