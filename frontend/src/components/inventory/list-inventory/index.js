import React from 'react';
import NumberFormat from 'react-number-format';

import { CRTable, H7 } from 'components';
import { getUnitOfMeasureShortCut } from 'services/inventory';

const ListInventory = ({ items }) => {
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
    </CRTable>
  );
};

ListInventory.defaultProps = {
  items: [],
};

export default ListInventory;
