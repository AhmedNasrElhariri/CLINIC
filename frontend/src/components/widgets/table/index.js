import React from 'react';
import styled from 'styled-components';
import { Table } from 'rsuite';

import CRHeaderCell from './header-cell';
import CRCell from './cell';
import { BarStyled, CRCellStyled } from './style';
import CRDateCell from './date-cell';

const CRTableStyled = styled(Table).attrs(() => ({
  rowHeight: 35,
  autoHeight: true,
}))`
  cursor: pointer;
  & .rs-table-row {
  }
  & .rs-table-row-header {
    border-left: none;
  }
  & .rs-table-cell-content {
    padding: 0px;
    border-left: 1px solid white;
  }
  & .rs-table-row {
    text-align: center;
  }
`;

const CRTable = ({ children, flag, ...props }) => (
  <CRTableStyled {...props}>
    <CRTable.CRColumn width={6}>
      <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
      <CRTable.CRCell>{() => <BarStyled flag={flag} />}</CRTable.CRCell>
    </CRTable.CRColumn>
    {children}
  </CRTableStyled>
);

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRDateCell = CRDateCell;
CRTable.CRCellStyled = CRCellStyled;
CRTable.CRPagination = Table.Pagination;

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRDateCell = CRDateCell;
CRTable.CRCellStyled = CRCellStyled;
CRTable.CRPagination = Table.Pagination;

export default CRTable;
