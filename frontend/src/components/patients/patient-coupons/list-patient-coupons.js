import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';

function ListPatientCoupons({
  coupons,
  setCouponId,
  setShowCouponTransactions,
}) {
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={coupons}
          onRowClick={coupon => {
            setCouponId(coupon.id);
            setShowCouponTransactions(true);
          }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('value')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ value }) => (
                <CRTable.CRCellStyled bold>{value}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('remaingValue')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ remaining }) => (
                <CRTable.CRCellStyled bold>{remaining}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('expiryDate')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ expiryDate }) => (
                <CRTable.CRCellStyled bold>
                  {expiryDate ? formatDate(expiryDate) : ''}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('status')}</CRTable.CRHeaderCell>
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
