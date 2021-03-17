import styled from 'styled-components';

import { byTheme } from 'services/theme';
import { cursor } from 'styles/props';
import { space, layout } from 'styled-system';

const theme = {
  fontSize: {
    normal: 18,
    large: 22,
  },

  borderRadius: {
    normal: 10,
    large: 17,
  },
};

const getBorder = ({ borderless, theme }) => {
  return {
    border: borderless ? 'none' : `1px solid ${theme.colors.borders[0]}`,
  };
};

export default styled.div`
  background-color: #ffffff;

  border: 1px solid ${props => props.theme.colors.cardBorder};
  padding: ${props => props.padding ? props.padding: '0px'};

  ${byTheme(theme)}
  ${getBorder}

  ${space}
  ${layout}
  ${cursor}
`;
