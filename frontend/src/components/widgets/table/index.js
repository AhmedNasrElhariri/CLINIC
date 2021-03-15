import styled from 'styled-components';
import { Table } from 'rsuite';

import CRHeaderCell from './header-cell';
import CRCell, { CRCellStyled } from './cell';


const CRTable = styled(Table)`
  cursor: pointer;
  & .rs-table-row {
    border-left:${props => props.border};
  }
  & .rs-table-row-header {  
    border-left:none;
  }
  & .rs-table-cell-content {
    padding: 0px ;
  }
  }
  & .rs-table-cell-content > * {
    text-align: center;
    padding-top: 11px;
  }
  & .rs-table-row {
    border-bottom: 1px solid white;
  }
`;

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRCellStyled = CRCellStyled;
CRTable.CRPagination = Table.Pagination;

export default CRTable;
