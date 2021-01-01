import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListSurgeries({ surgeries,onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={surgeries}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn width={35}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => <Icon icon="edit" onClick={() => onEdit(data)} />}
            </CRTable.CRCell>
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
