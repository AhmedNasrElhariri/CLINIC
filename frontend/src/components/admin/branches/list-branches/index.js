import React from 'react';
import { Tag,Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

export default function ListBranches({
  branches,
  onSpecilatyClick,
  branchIds,
  specialtyIds,
  onEdit,
  onDeleteBranch
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
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('phoneNo')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="phoneNo" />
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
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon icon="edit" onClick={() => onEdit(data)}>
                    {' '}
                    {t('edit')}
                  </Icon>
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon icon="trush" onClick={() => onDeleteBranch(data)}>
                    {' '}
                    {t('delete')}
                  </Icon>
                </CRTable.CRCellStyled>
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
