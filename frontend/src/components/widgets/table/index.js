import styled from 'styled-components';
import { Table } from 'rsuite';

import CRHeaderCell from './header-cell';
import CRCell, { CRCellStyled } from './cell';
import { props } from 'ramda';
import { minHeight } from 'styled-system';

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
    border-bottom: 3px solid white;
  }
  }
  & .rs-table-cell-content > * {
    height: ${props => props.height};
    text-align: center;
  }
`;

CRTable.CRColumn = Table.Column;
CRTable.CRHeaderCell = CRHeaderCell;
CRTable.CRCell = CRCell;
CRTable.CRCellStyled = CRCellStyled;
CRTable.CRPagination = Table.Pagination;

export default CRTable;
