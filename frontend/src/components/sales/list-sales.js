import React from 'react';
import { Icon } from 'rsuite';
import { formatDate } from 'utils/date';
import { STANDARD_DATE_FORMAT } from 'utils/constants';
import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

function ListSaleses({ saleses, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={saleses}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('number')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }, index) => (
                <CRTable.CRCellStyled bold>{index + 1}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date, STANDARD_DATE_FORMAT)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ salesDefinition }) => (
                <CRTable.CRCellStyled bold>
                  {salesDefinition.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('creator')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>{user?.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('price')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ salesDefinition }) => (
                <CRTable.CRCellStyled bold>
                  {salesDefinition?.price}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('quantity')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ quantity }) => (
                <CRTable.CRCellStyled bold>{quantity}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('totalPrice')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalPrice }) => (
                <CRTable.CRCellStyled bold>{totalPrice}</CRTable.CRCellStyled>
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

export default ListSaleses;
