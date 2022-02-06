import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';

function ListPatientCoupons({ coupons }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={coupons}>
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
            <CRTable.CRHeaderCell>Value</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ value }) => (
                <CRTable.CRCellStyled bold>{value}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Remaing Value</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ remaining }) => (
                <CRTable.CRCellStyled bold>{remaining}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Expire Date</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ expireDate }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(expireDate)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Status</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ status }) => (
                <CRTable.CRCellStyled bold>{status}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListPatientCoupons;
