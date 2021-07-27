import React from 'react';
import { Tag, Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListAssigns({ data, onEdit,onDelete }) {
  return (
    <>
      <CRCard borderless>
        <CRTable data={data} autoHeight>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Role</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Users</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ users }) => (
                <CRTable.CRCellStyled style={{ display: 'block' }}>
                  {users.map((u, index) => (
                    <Tag key={index}>{u.name}</Tag>
                  ))}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Edit</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {(_, idx) => (
                <CRTable.CRCellStyled>
                  <Icon icon="edit" onClick={() => onEdit(idx)} />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Change</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {(_, idx) => (
                <CRTable.CRCellStyled>
                  <Icon icon="edit" onClick={() => onDelete(idx)} />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListAssigns;
