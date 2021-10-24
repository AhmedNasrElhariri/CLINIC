import React from 'react';
import { Tag } from 'rsuite';

import { CRCard, CRTable } from 'components';
export default function ListSpecialties({
  specialties,
  onBranchClick,
  branchIds,
  specialtyIds,
}) {
  const checkSpecialty = specialtyId => {
    if (specialtyIds.includes(specialtyId)) {
      return true;
    } else {
      return false;
    }
  };
  const checkBranch = (branchId, specialtyId) => {
    if (branchIds.includes(branchId) && specialtyIds.includes(specialtyId)) {
      return true;
    } else {
      return false;
    }
  };
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
              {({ branches, id: specialtyId }) => (
                <div>
                  {branches.map(({ name, id: branchId }, index) =>
                    checkBranch(branchId, specialtyId) ? (
                      <Tag
                        key={index}
                        color="blue"
                        onClick={() => onBranchClick(branchId, specialtyId)}
                      >
                        {name}
                      </Tag>
                    ) : (
                      <Tag
                        key={index}
                        onClick={() => onBranchClick(branchId, specialtyId)}
                      >
                        {name}
                      </Tag>
                    )
                  )}
                </div>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Doctors</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ doctors, id: specialtyId }) =>
                checkSpecialty(specialtyId) ? (
                  <div>
                    {doctors.map(({ name }, index) => (
                      <Tag key={index}>{name}</Tag>
                    ))}
                  </div>
                ) : (
                  ''
                )
              }
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
