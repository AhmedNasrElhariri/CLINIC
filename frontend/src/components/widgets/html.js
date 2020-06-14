import styled, { css } from 'styled-components';
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  variant,
} from 'styled-system';

import { colors } from 'styles/constants';
import { byTheme } from 'services/theme';
import { textTransform, cursor } from 'styles/props';

const variants = variant({
  variants: {
    primary: {
      color: theme => theme.colors.primary,
    },
  },
});

export const styles = css`
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${grid}
  ${background}
  ${border}
  ${position}
  ${shadow}
  ${textTransform}
  ${cursor}
`;

const headerscss = css`
  ${styles}
  color: ${props => props.theme.colors.text};
  ${variants}
`;

export const H1 = styled.h1`
  ${headerscss}
  font-size: 65px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 3.25px;
  text-align: left;
  font-family: 'BebasNeue';
`;

export const H2 = styled.h2`
  ${headerscss}
  font-size:50px;
  font-family: 'BebasNeue';
`;

export const H3 = styled.h3`
  ${headerscss}
`;

export const H4 = styled.h4`
  ${headerscss}
  ${byTheme({
    fontSize: {
      normal: 18.7,
      large: 24,
    },
  })};
`;

export const H5 = styled.h5`
  font-family: 'SegoeUI';
  line-height: 32px;
  ${byTheme({
    fontSize: {
      normal: 18.7,
      large: 22,
    },
  })};

  ${headerscss}
`;

export const H6 = styled.h6`
  ${headerscss}
  font-family: 'SegoeUI';
  line-height: 1.35rem;
  ${byTheme({
    fontSize: {
      normal: 16,
      large: 20,
    },
  })};
`;

H6.defaultProps = {
  fontWeight: 'normal',
};

export const Div = styled.div`
  ${styles}
`;

export const Img = styled.img`
  ${space}
  ${position}
`;
