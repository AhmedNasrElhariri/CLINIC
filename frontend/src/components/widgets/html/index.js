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

import { byTheme } from 'services/theme';
import { textTransform, cursor, zIndex } from 'styles/props';

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
  ${zIndex}
`;

const headerscss = css`
  color: ${props => props.theme.colors.text};
  ${styles}
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
  ${byTheme({
    fontSize: {
      normal: 18.7,
      large: 32,
    },
  })};
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

export const H7 = styled.h6`
  ${headerscss}
  ${byTheme({
    fontSize: {
      normal: 16,
      large: 18,
    },
  })};
`;

H7.defaultProps = {
  fontWeight: 'normal',
};

export const P = styled.p`
  ${headerscss}
  font-weight: 200;
  ${byTheme({
    fontSize: {
      normal: 16,
      large: 18,
    },
  })};
`;

export const P2 = styled.p`
  ${headerscss}
  font-weight: 200;
  ${byTheme({
    fontSize: {
      normal: 14,
      large: 16,
    },
  })};
`;

export const Div = styled.div`
  ${styles}
`;
export const Small = styled.small`
  ${styles}
`;


export const Img = styled.img`
  ${space}
  ${position}
  ${border}
  ${color}
`;
