import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
function ListLabDocs({ labs ,labId}) {
  const lab = labs.filter(ele => ele.id === labId);
  return (
    <CRCard borderless>
      <CRTable autoHeight data={lab}>
        <CRTable.CRColumn flexGrow={0.5}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ name }) => (
              <CRTable.CRCellStyled semiBold>{name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Value</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="value" semiBold />
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
}
ListLabDocs.defaultProps = {
  labDocs: [],
};
export default ListLabDocs;
