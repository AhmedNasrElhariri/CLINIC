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

export const FileStyled = styled.div`
  height: 35px;
  background-color: #eef1f1;
  padding: 7px;
  margin-bottom: 4px;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #1b253a;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
