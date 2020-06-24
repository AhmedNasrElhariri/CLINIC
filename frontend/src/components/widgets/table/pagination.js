import React from 'react';
import { space, typography, layout, variant, border } from 'styled-system';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { byTheme } from 'services/theme';
import { textTransform } from 'styles/props';
import { Table } from 'rsuite';

const theme = {
  fontSize: {
    normal: 18,
    large: 20,
  },
};

const smallHeight = {
  height: {
    normal: 10,
    large: 43,
  },
};

const largeHeight = {
  height: {
    normal: 16,
    large: 52,
  },
};

const normalHeight = {
  height: {
    normal: 16,
    large: 59,
  },
};

const roundBorderRadius = {
  borderRadius: {
    normal: 10,
    large: 57,
  },
};

const midBorderRadius = {
  borderRadius: {
    normal: 10,
    large: 22,
  },
};

const normalBorderRadius = {
  borderRadius: {
    normal: 10,
    large: 17,
  },
};

const getHeight = ({ small, large }) =>
  small
    ? byTheme(smallHeight)
    : large
    ? byTheme(largeHeight)
    : byTheme(normalHeight);

const getBorderRadius = ({ round, midRound }) =>
  round
    ? byTheme(roundBorderRadius)
    : midRound
    ? byTheme(midBorderRadius)
    : byTheme(normalBorderRadius);

//   .attrs(
//   ({ block, bold, semiBold, uppercase, primary }) => ({
//     width: block ? '100%' : 'initial',
//     fontWeight: bold ? 800 : semiBold ? 600 : 400,
//     textTransform: uppercase ? 'uppercase' : 'initial',
//     variant: primary ? 'primary' : '',
//   })
// )`
const CRPagination = styled(Table.Pagination)`
  /* background-color: ${props => props.theme.colors.dark};
  opacity: 0.2;
  font-stretch: normal;
  font-style: normal;
  line-height: 0;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  padding: 0px 26px;

  ${getBorderRadius}
  ${getHeight}

  ${byTheme(theme)};
  ${space}
  ${typography}
  ${layout}
  ${textTransform}
  ${border}


  ${variant({
    variants: {
      primary: {
        'background-color': theme => theme.colors.primary,
        opacity: 1,
      },
    },
  })}

  &:focus,
  &:active,
  &:hover,
  &:visited {
    background-color: ${props => props.theme.colors.primary};
    opacity: 1;
    outline: none;
  } */
`;

// Button.propTypes = {
//   round: PropTypes.bool,
//   block: PropTypes.bool,
//   bold: PropTypes.bool,
//   uppercase: PropTypes.bool,
// };

// Button.defaultProps = {
//   round: false,
//   block: false,
// };

export default CRPagination;
