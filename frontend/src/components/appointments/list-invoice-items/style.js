import styled from 'styled-components';
import { H6, H7 } from 'components';

export const SessionNameStyled = styled(H6)`
  text-decoration: underline;
`;

export const DeleteLinkStyled = styled(H7)`
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  margin-left: 8px;
`;
export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 396px;
  height: 53px;
  padding: 8px 10px 8px 10px;
  background-color: #f0f1f1;
  margin-bottom: 10px;
`;
