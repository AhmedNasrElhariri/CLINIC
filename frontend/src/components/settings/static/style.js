import styled from 'styled-components';

export const FormStyled = styled.div`
  padding: 20px;
`;

export const BadgtStyled = styled.span`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  position: absolute;
  left: 130px;
  top: 130px;
`;
