import React from 'react';
import { Icon } from 'rsuite';
import { formatDate } from 'utils/date';
import { CRCard, CRTable } from 'components';
function ListLabDocs({ images, onEdit }) {
  return (
    <CRCard borderless>
      <CRTable autoHeight data={images}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ imageDefinition }) => (
              <CRTable.CRCellStyled>{imageDefinition.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name">
            {({ date }) => (
              <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <>
                <Icon
                  icon="edit"
                  onClick={() => onEdit(data)}
                  style={{
                    fontSize: 17,
                    padding: '15px',
                    backgroundColor: '#eef1f1',
                    paddingRight: '40px',
                    marginLeft: '1px',
                  }}
                />
                <Icon
                  icon="trash"
                  style={{
                    fontSize: 17,
                    padding: '15px',
                    backgroundColor: '#eef1f1',
                    paddingRight: '40px',
                    marginLeft: '1px',
                  }}
                />
              </>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
}

ListLabDocs.defaultProps = {
  labDocs: [],
};

export default ListLabDocs;
