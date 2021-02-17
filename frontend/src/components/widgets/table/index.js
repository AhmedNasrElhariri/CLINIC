import styled from 'styled-components';
import { Table } from 'rsuite';

import CRHeaderCell from './header-cell';
import CRCell, { CRCellStyled } from './cell';
import { props } from 'ramda';

const CRTable = styled(Table).attrs(props => ({
  rowHeight: props.rowHeight ,
  minHeight: props.minHeight, 
  bordered: false,
}))`
  cursor: pointer;
  & .rs-table-row {
    border-left:${props => props.border};
  }
  & .rs-table-row-header {
    border-left:none;
  }
  & .rs-table-cell-content {
    padding: 0px ;
    border-bottom: 2px solid white;
  }
  }
  & .rs-table-cell-content > * {
    height: 35px;
    text-align: center;
    vertical-align: center;
  }
`;

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRCellStyled = CRCellStyled;
CRTable.CRPagination = Table.Pagination;

export default CRTable;
