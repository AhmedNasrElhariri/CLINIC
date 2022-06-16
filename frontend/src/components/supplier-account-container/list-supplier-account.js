import React, { useCallback } from 'react';
import { Icon } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { CRCard, CRTable } from 'components';

function ListSupplierAccount({
  supplierAccounts,
  onEdit,
  currentPage,
  setCurrentPage,
  pages,
  t,
}) {
  const history = useHistory();
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={supplierAccounts}
          onRowClick={supplierAccount => {
            history.push(
              `/supplier-account/${supplierAccount.id}?supplierId=${supplierAccount.id}`
            );
          }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('companyName')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('phoneNo')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ phoneNo }) => (
                <CRTable.CRCellStyled bold>{phoneNo}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('totalPaid')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalPaid }) => (
                <CRTable.CRCellStyled bold>{totalPaid}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('totalUnPaid')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalUnpaid }) => (
                <CRTable.CRCellStyled bold>{totalUnpaid}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('invoiceCount')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ invoiceCount }) => (
                <CRTable.CRCellStyled bold>{invoiceCount}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
        <CRTable.CRPagination
          lengthMenu={[
            {
              value: 10,
              label: 10,
            },
            {
              value: 20,
              label: 20,
            },
          ]}
          activePage={currentPage?.activePage}
          pages={pages}
          onSelect={handleSelect}
        />
      </CRCard>
    </>
  );
}

export default ListSupplierAccount;
