import styled from 'styled-components';
import { Table } from 'rsuite';

import CRHeaderCell from './header-cell';
import CRCell from './cell';

const CRTable = styled(Table).attrs(() => ({
  rowHeight: 75,
  bordered: false,
}))`
  cursor: pointer;
  & .rs-table-row {
    border-bottom: none !important;
  }
`;

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRPagination = Table.Pagination;

export default CRTable;
