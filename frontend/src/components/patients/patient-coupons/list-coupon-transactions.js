import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';

function ListCouponTransactions({ transactions }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={transactions}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Amount</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ amount }) => (
                <CRTable.CRCellStyled bold>{amount}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListCouponTransactions;
