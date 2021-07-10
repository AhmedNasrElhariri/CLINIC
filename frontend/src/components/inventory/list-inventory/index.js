import React from 'react';
import NumberFormat from 'react-number-format';

import { CRTable } from 'components';
import { getUnitOfMeasureShortCut } from 'services/inventory';
import RemoveItem from '../remove-item';

const ListInventory = ({ items }) => {
  console.log(items);
  return (
    <CRTable autoHeight data={items}>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="name" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Amount</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="amount" semiBold>
          {({ amount }) => (
            <CRTable.CRCellStyled semiBold>
              <NumberFormat
                value={amount}
                displayType="text"
                thousandSeparator
              />
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Total Quantity</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ quantity, item }) => (
            <CRTable.CRCellStyled semiBold>
              <NumberFormat
                value={quantity}
                displayType="text"
                thousandSeparator
              />
              <span display="inline" ml={2}>
                {getUnitOfMeasureShortCut(item.unitOfMeasure)}
              </span>
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ user }) => (
            <CRTable.CRCellStyled>{user?.name}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={0.8}>
        <CRTable.CRHeaderCell>Specialty</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ specialty }) => (
            <CRTable.CRCellStyled>{specialty?.name}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={0.8}>
        <CRTable.CRHeaderCell>Branch</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ branch }) => (
            <CRTable.CRCellStyled>{branch?.name}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn width={35}>
        <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
        <CRTable.CRCell>{data => <RemoveItem item={data} />}</CRTable.CRCell>
      </CRTable.CRColumn>
    </CRTable>
  );
};

ListInventory.defaultProps = {
  items: [],
};

export default ListInventory;
