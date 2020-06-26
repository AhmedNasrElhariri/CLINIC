import styled from 'styled-components';
import css from '@styled-system/css';

import { Div } from 'components';

export const Container = styled.div`
  width: 517px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
  border: solid 1px rgba(40, 49, 72, 0.1);
  background-color: #ffffff;
  position: absolute;
  top: 140px;
  z-index: 100;
  border-radius: 17px;

  ${css({
    right: [10, 10, '17%'],
  })}
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
  padding-left: 50px;
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
