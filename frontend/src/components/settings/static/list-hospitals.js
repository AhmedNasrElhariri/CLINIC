import React from 'react';

import { CRCard, CRTable } from 'components';

function ListHospitals({ hospitals }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={hospitals}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="phoneNo" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Address</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="address" />
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListHospitals.defaultProps = {
  hospitals: [],
};

export default ListHospitals;
