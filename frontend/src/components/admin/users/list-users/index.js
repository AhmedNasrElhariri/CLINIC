import React from 'react';
import { CRCard, CRTable } from 'components';
import {} from 'rsuite';

export default function Users({ users }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={users} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name">
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}></CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

Users.propTypes = {};

Users.defaultProps = {
  users: [],
};
