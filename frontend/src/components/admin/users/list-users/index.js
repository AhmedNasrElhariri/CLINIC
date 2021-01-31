import React from 'react';
import { Tag } from 'rsuite';

import { CRCard, CRTable } from 'components';

export default function Users({ users }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={users} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Email</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="email" />
          </CRTable.CRColumn>

          {/* <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Doctors</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ doctors }) => (
                <div>
                  {doctors.map(({ name }, index) => (
                    <Tag key={index}>{name}</Tag>
                  ))}
                </div>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn> */}
        </CRTable>
      </CRCard>
    </>
  );
}

Users.propTypes = {};

Users.defaultProps = {
  users: [],
};
