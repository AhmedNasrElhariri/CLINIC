import styled from 'styled-components';

import { Div } from 'components';

export const NavStyled = styled.nav`
  display: flex;
  align-items: center;
  height: ${props => props.theme.navbar.height};
  min-height: ${props => props.theme.navbar.height};
  padding: 0px 64px;
`;

export const ItemStyled = styled(Div)`
  width: 136px;
  min-width: 136px;
`;
