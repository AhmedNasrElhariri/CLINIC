import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListLabDocs({ labs, onEdit }) {
  return (
    <CRCard borderless>
      <CRTable autoHeight data={labs}>
        <CRTable.CRColumn flexGrow={2}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={2}>
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
                    padding: '15px',
                    backgroundColor: '#eef1f1',
                    paddingRight: '40px',
                  }}
                >
                  {' '}
                  insert Values
                </Icon>
                <Icon
                  icon="edit"
                  style={{
                    fontSize: 17,
                    padding: '15px',
                    backgroundColor: '#eef1f1',
                    paddingRight: '40px',
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
