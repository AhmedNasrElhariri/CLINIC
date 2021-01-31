import React from 'react';
import { Tag } from 'rsuite';

import { CRCard, CRTable } from 'components';
export default function ListBranches({ branches }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={branches} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="phoneNo" />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Specialties</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ specialties }) => (
                <div>
                  {specialties.map(({ name }, index) => (
                    <Tag key={index}>{name}</Tag>
                  ))}
                </div>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListBranches.propTypes = {};

ListBranches.defaultProps = {
  branches: [],
};
