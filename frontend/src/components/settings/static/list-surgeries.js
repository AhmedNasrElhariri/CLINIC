import React from 'react';

import { CRCard, CRTable } from 'components';

function ListSurgeries({ surgeries }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={surgeries}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" semiBold />
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListSurgeries.defaultProps = {
  surgeries: [],
};

export default ListSurgeries;
