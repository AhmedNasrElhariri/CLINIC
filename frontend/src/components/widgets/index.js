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
} from 'styled-system';

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
`;

export const H3 = styled.h3`
  ${styles}
`;

export const H4 = styled.h4`
  ${styles}
`;

export const H5 = styled.h5`
  ${styles}
`;

export const Div = styled.div`
  ${styles}
`;
