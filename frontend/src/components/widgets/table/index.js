import styled from 'styled-components';
import { Table } from 'rsuite';

import CRHeaderCell from './header-cell';
import CRCell, { CRCellStyled } from './cell';

const CRTable = styled(Table).attrs(() => ({
  rowHeight: 75,
  headerHeight: 75,
  bordered: false,
}))`
  cursor: pointer;
  & .rs-table-row {
    border-bottom: none;
    padding-bottom: 30px;
  }

  & .rs-table-row-header {
    border-bottom: 2px solid ${props => props.theme.colors.primaryLighter} !important;
  }
`;

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRCellStyled = CRCellStyled;
CRTable.CRPagination = Table.Pagination;

export default CRTable;
