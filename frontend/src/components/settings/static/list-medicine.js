import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListMedicines() {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Medicine Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="medicineName" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Concentration</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="concentration" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Medicine Form</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="medicineForm" />
          </CRTable.CRColumn>

          <CRTable.CRColumn width={35}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {/* {data => <Icon icon="edit" onClick={() => onEdit(data)} />} */}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          
        </CRTable>
      </CRCard>
    </>
  );
}



export default ListMedicines;
