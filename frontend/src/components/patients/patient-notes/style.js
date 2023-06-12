import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

export const StyledUl = styled.ul`
  margin: 20px 20px;
  background-color: #80808014;
`;
export const StyledLi = styled.li`
  font-weight: bold;
  padding: 10px;
`;
export const StyledEl = styled.p`
  margin-left: 25px;
  font-weight: 600;
`;
export const StyledDeleteIcon = styled(MdDelete)`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;
