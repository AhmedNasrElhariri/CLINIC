import React from 'react';
import { formatDate } from 'utils/date';
import { CRCard, CRTable } from 'components';
import { Icon } from 'rsuite';

function ListInvoiceTransactions({ invoiceTransactions, onEdit, t }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={invoiceTransactions}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('creator')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>{user.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('paid')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ paid }) => (
                <CRTable.CRCellStyled bold>{paid}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('checkNo')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ checkNumber }) => (
                <CRTable.CRCellStyled bold>{checkNumber}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('checkDueDate')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ checkDate }) => (
                <CRTable.CRCellStyled bold>
                  {checkDate ? formatDate(checkDate, 'dddd, DD-MM-YYYY') : ''}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('type')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ type }) => (
                <CRTable.CRCellStyled bold>{type}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date, 'dddd, DD-MM-YYYY')}
                </CRTable.CRCellStyled>
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
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListInvoiceTransactions;
