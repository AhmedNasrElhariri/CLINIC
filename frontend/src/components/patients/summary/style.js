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
