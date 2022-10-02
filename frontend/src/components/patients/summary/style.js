import styled from 'styled-components';
import { H6 } from 'components';

export const ValueStyled = styled(H6)`
  word-break: break-all;
  font-weight: 800;
`;

export const KeyStyled = styled(H6)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  min-width: 100px;
  max-width: 100px;
`;

export const StyledCell = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid gray;
  justify-content: center;
  display: flex;
  align-items: center;
`;
export const StyledContainer = styled.div`
  width: 50px;
`;
export const StyledHeader = styled.div`
  width: 100%;
  height: 20px;
`;
