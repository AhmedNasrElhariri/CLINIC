import styled from 'styled-components';
import { Icon } from 'rsuite';
import { H6 } from 'components';

export const UploaderButtonStyled = styled.button`
  width: 600px;
  height: 200px;
  margin: 0;
`;

// export const UploaderButtonStyled = styled.button`
//   width: 180;
//   height: 200;
//   margin: 0;
// `;

export const IconStyled = styled(Icon)`
  margin-left: 10px;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background: #bcbcbc;
    border-radius: 50%;
  }
`;

export const Comment = styled(H6)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
`;