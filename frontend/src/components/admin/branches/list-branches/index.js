import React from 'react';
import { Tag } from 'rsuite';

import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={branches} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            {({ name }) => (
              <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('phoneNo')}</CRTable.CRHeaderCell>
            {({ phoneNo }) => (
              <CRTable.CRCellStyled bold>{phoneNo}</CRTable.CRCellStyled>
            )}
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('specialties')}</CRTable.CRHeaderCell>
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
            <CRTable.CRHeaderCell>{t('doctors')}</CRTable.CRHeaderCell>
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
