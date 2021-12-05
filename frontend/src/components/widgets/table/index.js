import React from 'react';
import styled from 'styled-components';
import { Table } from 'rsuite';
import CRHeaderCell from './header-cell';
import CRCell from './cell';
import { BarStyled, CRCellStyled } from './style';
import CRDateCell from './date-cell';

const CRTableStyled = styled(Table).attrs(({ data }) => ({
  rowHeight: 37,
  minHeight: data.length * 37 + 40,
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

  & .rs-table-body-row-wrapper {
    /* height: 100% !important; */
  }
`;

const CRTable = ({ children, flag, noFlag, ...props }) => (
  <CRTableStyled {...props}>
    {!noFlag && (
      <CRTable.CRColumn width={7}>
        <CRTable.CRHeaderCell />
        <CRTable.CRCell>{() => <BarStyled flag={flag} />}</CRTable.CRCell>
      </CRTable.CRColumn>
    )}
    {children}
  </CRTableStyled>
);

CRTable.defaultProps = {
  noFlag: false,
};

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
