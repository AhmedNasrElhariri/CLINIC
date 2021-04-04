import React from 'react';

import styled from 'styled-components';
import { ControlLabel } from 'rsuite';
import { byTheme } from 'services/theme';
import { variant } from 'styled-system';

const labelTheme = {
  fontSize: {
    normal: 14,
    large: 24,
  },
};

const LabelStyled = styled(ControlLabel)`
  ${byTheme(labelTheme)}
  line-height: 32px;
  color: ${props => props.theme.colors.text};
  margin: 0;
  margin-bottom: ${({ $noLabel }) => ($noLabel ? '0px' : '10px')};
  ${variant({
    prop: 'layout',
    variants: {
      inline: {
        'margin-bottom': '0px',
      },
      vertical: {
        'margin-bottom': '10px',
      },
    },
  })}
`;

const CRLabel = ({ noLabel, ...rest }) => (
  <LabelStyled {...rest} $noLabel={noLabel} />
);

CRLabel.defaultProps = {
  noLabel: false,
};

export default CRLabel;
