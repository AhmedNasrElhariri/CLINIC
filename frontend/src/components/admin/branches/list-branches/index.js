import React from 'react';
import { Tag } from 'rsuite';

import { CRCard, CRTable } from 'components';
export default function ListBranches({
  branches,
  onSpecilatyClick,
  branchIds,
  specialtyIds,
}) {
  const checkSpecialty = (branchId, specialtyId) => {
    if (branchIds.includes(branchId) && specialtyIds.includes(specialtyId)) {
      return true;
    } else {
      return false;
    }
  };
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
              {({ specialties, id: branchId }) => (
                <div>
                  {specialties.map(
                    ({ name, doctors, id: specialtyId }, index) =>
                      checkSpecialty(branchId, specialtyId) ? (
                        <Tag
                          key={index}
                          color="blue"
                          onClick={() =>
                            onSpecilatyClick(branchId, specialtyId)
                          }
                        >
                          {name}
                        </Tag>
                      ) : (
                        <Tag
                          key={index}
                          onClick={() =>
                            onSpecilatyClick(branchId, specialtyId)
                          }
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
              {({ specialties, id: branchId }) => (
                <div>
                  {specialties.map(({ doctors, id: specialtyId }, index) =>
                    checkSpecialty(branchId, specialtyId)
                      ? doctors.map(({ name }) => <Tag key={index}>{name}</Tag>)
                      : ''
                  )}
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
