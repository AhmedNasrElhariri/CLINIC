import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListHospitals({ hospitals, onEdit }) {
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

          {/* <CRTable.CRColumn width={35}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => <Icon icon="edit" onClick={() => onEdit(data)} />}
            </CRTable.CRCell>
          </CRTable.CRColumn> */}
          
        </CRTable>
      </CRCard>
    </>
  );
}

ListHospitals.defaultProps = {
  hospitals: [],
};

export default ListHospitals;
