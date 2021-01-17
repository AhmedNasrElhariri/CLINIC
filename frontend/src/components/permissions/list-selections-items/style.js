import styled from 'styled-components';
import { H6, H7 } from 'components';

export const SessionNameStyled = styled(H6)`
  margin-left: 30px;
  margin-top:20px;
`;

export const DeleteLinkStyled = styled(H7)`
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  margin-left: 8px;
`;
