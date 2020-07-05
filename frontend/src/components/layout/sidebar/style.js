import styled from 'styled-components';
import css from '@styled-system/css';

export const ContainerStyled = styled.div`
  height: 100vh;
  background-color: #ffffff;

  ${css({
    width: [100, 200, 200, 310, 400],
    maxWidth: [100, 200, 200, 240, 400],
  })}
`;

export const BodyStyled = styled.div`
  ${css({
    paddingLeft: [20, 35, 50, 50, 100],
  })}
  padding-top: ${props => props.theme.navbar.height};
`;
