import styled from 'styled-components';
import css from '@styled-system/css';
import { Link } from 'react-scroll';

export const ContainerStyled = styled.div`
  height: 100vh;
  background-color: #ffffff;

  ${css({
    width: [100, 200, 200, 240, 400],
    minWidth: [100, 200, 200, 240, 400],
    maxWidth: [100, 200, 200, 240, 400],
  })}
`;

export const BodyStyled = styled.div`
  ${css({
    paddingLeft: [20, 20, 20, 30, 50],
  })}
  padding-top: ${props => props.theme.navbar.height};
`;

export const ItemStyled = styled(Link)`
  ${css({
    paddingLeft: [20, 35, 50, 50, 100],
  })}
  padding-top: ${props => props.theme.navbar.height};
`;
