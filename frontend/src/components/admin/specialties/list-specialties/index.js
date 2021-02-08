import React from 'react';
import { Tag } from 'rsuite';

import { CRCard, CRTable } from 'components';
export default function ListSpecialties({ specialties }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={specialties} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Branches</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ branches }) => (
                <div>
                  {branches.map(({ name }, index) => (
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

ListSpecialties.propTypes = {};

ListSpecialties.defaultProps = {
  specialties: [],
};
