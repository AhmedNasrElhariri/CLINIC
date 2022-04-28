import React from 'react';
import { Icon } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { CRCard, CRTable } from 'components';

function ListSupplierInvoices({ invoices, onEdit, onDelete, setInvoice }) {
  const history = useHistory();
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
                  <Icon icon="edit" onClick={() => onEdit(data)}>
                    {' '}
                    Edit
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
                  Delete
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListSupplierInvoices;
