import styled from 'styled-components';
import { space, layout } from 'styled-system';

export const KeyStyled = styled.span`
  width: 30px;
  display: inline-block;
  text-align: right;
  ${layout}
  ${space}
`;

export const ValueStyled = styled.span`
  width: 100%;
  font-weight: 500;
`;
