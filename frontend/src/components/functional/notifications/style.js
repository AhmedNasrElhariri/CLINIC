import styled from 'styled-components';

import { Div } from 'components';

export const Container = styled.div`
  width: 517px;
  -webkit-backdrop-filter: blur(30px);
  max-height: 500px;
  /* overflow: scroll; */
  padding: 32px;
  border: solid 1px rgba(40, 49, 72, 0.1);
  background-color: #ffffff;
  position: absolute;
  right: 10px;
  top: 40px;
  border-radius: 17px;
`;

export const NotificationStyled = styled(Div)`
  display: block;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  display: flex;
  align-items: center;
  height: 100px;
  /* padding-left: 50px; */
  border: ${props => `0.5px solid ${props.theme.colors.primaryLight}`};
  cursor: pointer;

  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};

  &:focus,
  &:active,
  &:hover {
    text-decoration: none;
    background-color: ${props => props.theme.colors.primaryLighter};
    opacity: 1;
  }
  display: flex;
  align-items: center;
`;
