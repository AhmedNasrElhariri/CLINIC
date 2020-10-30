import React from 'react';

import { CRTable } from 'components';

const ListItemsDefinitions = ({ items }) => {
  return (
    <CRTable autoHeight data={items}>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="name" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Unit of Measure</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="unitOfMeasure" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Quantity per unit</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="quantity" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Barcode</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="barcode" semiBold />
      </CRTable.CRColumn>
    </CRTable>
  );
};

ListItemsDefinitions.defaultProps = {
  items: [],
};

export default ListItemsDefinitions;
