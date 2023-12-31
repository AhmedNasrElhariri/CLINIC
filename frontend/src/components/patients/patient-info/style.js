import styled from 'styled-components';
import { Div, H6 } from 'components';
import { Button } from 'rsuite';
export const PatientInfoStyled = styled(Div)`
`;
export const EditButton = styled(Button)`
  background-color: white;
  color: #50c7f2;
  font-size: 18px;
`;
export const Cell = styled(Div)`
  border-bottom: 1px solid #c5c6c7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;
export const CellTitle = styled(H6)`
  font-family: SegoeUI;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: left;
  color: #727272;
`;
export const AddressStyled = styled.address`
  color: #3498ff;
`;
export const StrongStyled = styled.strong`
  font-family: SegoeUI;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #1b253a;
`;
