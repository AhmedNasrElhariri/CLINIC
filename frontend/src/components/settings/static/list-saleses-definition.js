import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListSalesesDefinition({ saless, onEdit, onDelete }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={saless}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Item Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name, level, branch, specialty, user }) => (
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
                    : user?.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Unit Cost</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ cost }) => (
                <CRTable.CRCellStyled bold>{cost}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Unit Price</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price }) => (
                <CRTable.CRCellStyled bold>{price}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Total Quantity</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalQuantity }) => (
                <CRTable.CRCellStyled bold>
                  {totalQuantity}
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

export default ListSalesesDefinition;
