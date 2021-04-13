import styled from 'styled-components';
export const HeaderRow = styled.div`
  display: flex;
  color: color: #b7b7b7;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
`;
export const Cell = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
  margin-right: 1px;
  height: 35px;
`;
export const RowData = styled.div`
  display: flex;
  background-color: #eef1f1;
  margin-bottom: 1px;
  border-left: 6px solid #3abbf0;
`;
export const RowDataCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 35px;
  margin-right: 2px;
  color: ${props => props.color};
  font-size: 12px;
  font-weight: bold;
  line-height: 1.33;
`;
export const TotalData = styled.div`
  display: flex;
  background-color: #3abbf0;
`;
export const TotalCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 35px;
  margin-right: 2px;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.36;
`;
