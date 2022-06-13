import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

function ListMedicines({ medicines, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={medicines}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name, branch, specialty, doctor, level }) => (
                <CRTable.CRCellStyled bold>
                  {name} {' / '}
                  {level}
                  {' / '}
                  {level === 'organization'
                    ? ''
                    : level === 'branch'
                    ? branch?.name
                    : level === 'specialty'
                    ? specialty?.name
                    : doctor?.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('concentration')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ concentration }) => (
                <CRTable.CRCellStyled bold>
                  {concentration}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('medicineForm')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ form }) => (
                <CRTable.CRCellStyled bold>{form}</CRTable.CRCellStyled>
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
                <Icon icon="trash" onClick={() => onDelete(data)}>
                  {' '}
                  {t('delete')}
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListMedicines;
