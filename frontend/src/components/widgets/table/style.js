import styled from 'styled-components';
import { variant } from 'styled-system';
import { Div, H6 } from '../html';

export const CRCellStyled = styled(H6)`
  ${variant({
    prop: 'bgvariant',
    variants: {
      grey: {
        background: '#eef1f1',
      },
      white: {
        background: '#ffffff',
        color: theme => theme.colors.text,
      },
      primary: {
        background: theme => theme.colors.primary100,
        color: theme => theme.colors.white,
      },
      success: {
        background: theme => theme.colors.successDarker,
        color: theme => theme.colors.white,
      },
      danger: {
        background: theme => theme.colors.dangerDarker,
        color: theme => theme.colors.white,
      },
    },
  })}
`;
CRCellStyled.defaultProps = {
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  bgvariant: 'grey',
  height: '100%',
  fontWeight: 600,
};

export const BarStyled = styled(Div)`
  height: 100%;
  ${variant({
    prop: 'flag',
    variants: {
      grey: {
        background: theme => theme.colors.grey,
      },
      white: {
        background: theme => theme.colors.white,
      },
      primary: {
        background: theme => theme.colors.primaryDarker,
      },
      success: {
        background: theme => theme.colors.successDarker,
      },
      danger: {
        background: theme => theme.colors.dangerDarker,
      },
      alert: {
        background: '#FFFF00',
      },
    },
  })}
`;
BarStyled.defaultProps = {
  flag: 'primary',
};
