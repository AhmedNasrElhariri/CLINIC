import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';
import Users from 'components/admin/users/list-users';


function ListAssigns({ data }) {
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
            <CRTable.CRCell >
              {({ users }) => (
                <CRTable.CRCellStyled style={{display:'block'}}>
                  {users.map(u => (
                    <div>{u.name}</div>
                  ))}
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
