import styled from 'styled-components';

export const ContainerStyled = styled.div`
  max-width: 400px;
  min-width: 400px;
  height: 100vh;
  background-color: #ffffff;
`;

export const BodyStyled = styled.div`
  padding-left: 100px;
  padding-top: ${props => props.theme.navbar.height};
`;
