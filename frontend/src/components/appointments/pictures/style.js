import styled from 'styled-components';
import { Icon } from 'rsuite';

export const UploaderButtonStyled = styled.button`
  width: 600px;
  height: 200px;
  margin: 0;
`;

export const IconStyled = styled(Icon)`
  margin-left: 10px;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background: #bcbcbc;
    border-radius: 50%;
  }
`;
