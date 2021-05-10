import React from 'react';
import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
function ListImageDocs({ images ,imageId}) {
  const image = images.filter(ele => ele.id === imageId);
  return (
    <CRCard borderless>
      <CRTable autoHeight data={image}>
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
ListImageDocs.defaultProps = {
  labDocs: [],
};
export default ListImageDocs;
