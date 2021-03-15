import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListLabDocs({ images, onEdit }) {
  return (
    <CRCard borderless>
      <CRTable autoHeight data={images}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="date" semiBold />
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
                    padding: '14px 23px 16px 22px',
                    borderRadius: '0px',
                    backgroundColor: '#eef1f1',
                    marginLeft: '1px',
                  }}
                >
                  {' '}
                  insert Values
                </Icon>
                <Icon
                  icon="edit"
                  style={{
                    fontSize: 17,
                    padding: '14px 33px 16px 32px',
                    borderRadius: '0px',
                    backgroundColor: '#eef1f1',
                    marginLeft: '1px',
                  }}
                >
                  {' '}
                  Delete
                </Icon>
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
