import React from 'react';
import { Icon } from 'rsuite';
import { CRCard, CRTable, H2 } from 'components';

function Table({ data, borderLeft }) {
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={data}
          rowHeight={35}
          minHeight={35}
          height="35px"
          border={borderLeft}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="patientName" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Status</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="status" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="type" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Timeline</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="timeline" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="date" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="doctor" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell style={{ backgroundColor: '#eef1f1' }}>
              <Icon icon="print"> Print</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell style={{ backgroundColor: '#eef1f1' }}>
              <Icon icon="close"> Edit</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell style={{ backgroundColor: '#eef1f1' }}>
              <Icon icon="edit"> Cancel</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default Table;
