import React from 'react';
import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

function ListCourseTypes({ courseTypes, onEdit }) {
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={courseTypes}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('price')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price }) => (
                <CRTable.CRCellStyled bold>{price}</CRTable.CRCellStyled>
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
                <Icon icon="trash" onClick={() => onEdit(data)}>
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

export default ListCourseTypes;
