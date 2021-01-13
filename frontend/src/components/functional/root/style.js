import styled from 'styled-components';
import css from '@styled-system/css';

export const ContainerStyled = styled.div`
  display: flex;
`;

export const MainStyled = styled.div`
  flex-grow: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ContentStyled = styled.div`
  flex-grow: 1;
  width: 100%;
  border: solid 1px rgb(112, 112, 112, 0.03);
  background-color: ${props => props.theme.colors.background};
  ${css({
    padding: [10, 10, 10, 10, 32],
  })}
`;
