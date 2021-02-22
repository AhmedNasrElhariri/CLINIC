import styled from 'styled-components';

import { Div } from 'components';

export const NavStyled = styled.nav`
  display: flex;
  align-items: center;
  height: ${props => props.theme.navbar.height};
  min-height: ${props => props.theme.navbar.height};
  padding: 0px 64px;
  border-left: solid 1px rgb(112, 112, 112, 0.1);
`;

export const ItemStyled = styled(Div)`
  width: 136px;
  min-width: 136px;
`;

export const BadgeStyled = styled(Div)`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: red;
  top: 10px;
  left: 7px;
  position: absolute;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;

  & span {
    font-size: 13px;
  }
`;
