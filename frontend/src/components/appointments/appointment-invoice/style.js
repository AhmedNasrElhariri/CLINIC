import styled from 'styled-components';
import { H6, H7 } from 'components';

export const DeleteLinkStyled = styled(H7)`
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  margin-left: 8px;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  margin: 0px 47px 33px 47px;
`;
