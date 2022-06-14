import React, { useCallback } from 'react';
import { CRCard, CRTable } from 'components';
import { Icon } from 'rsuite';

function ListSupplierInvoices({
  invoices,
  setInvoice,
  currentPage,
  setCurrentPage,
  pages,
  onEdit,
}) {
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
          data={invoices}
          onRowClick={supplierInvoice => {
            // history.push(
            //   `/supplier-invoice/${supplierInvoice.id}?supplierInvoiceId=${supplierInvoice.id}`
            // );
            setInvoice(supplierInvoice);
          }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
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
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Paid</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ paid }) => (
                <CRTable.CRCellStyled bold>{paid}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Invoice Number</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ invoiceNumber }) => (
                <CRTable.CRCellStyled bold>
                  {invoiceNumber}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon
                    icon="edit"
                    onClick={e => {
                      e.stopPropagation();
                      onEdit(data);
                    }}
                  >
                    {' '}
                    Edit
                  </Icon>
                </CRTable.CRCellStyled>
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

export default ListSupplierInvoices;
