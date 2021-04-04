import styled from 'styled-components';
import { H7 } from 'components';

export const DeleteLinkStyled = styled(H7)`
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  margin-left: 8px;
`;
export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 396px;
  padding: 8px 12px;
  background-color: #f0f1f1;
  margin-bottom: 10px;
`;
