import React from 'react';
import { Icon } from 'rsuite';
import { CRCard, CRTable, H2 } from 'components';

function Table({ data, borderLeft ,onEdit}) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={data} border={borderLeft}>
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
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <>
                  <Icon
                    icon="edit"
                    onClick={() => onEdit(data)}
                    style={{
                      fontSize: 17,
                      padding: '15px',
                      backgroundColor: '#eef1f1',
                      paddingRight: '40px',
                      marginLeft: '1px',
                    }}
                  >
                    {' '}
                    Print
                  </Icon>
                  <Icon
                    icon="edit"
                    onClick={() => onEdit(data)}
                    style={{
                      fontSize: 17,
                      padding: '15px',
                      backgroundColor: '#eef1f1',
                      paddingRight: '40px',
                      marginLeft: '1px',
                    }}
                  >
                    {' '}
                    Edit
                  </Icon>
                  <Icon
                    icon="edit"
                    onClick={() => onEdit(data)}
                    style={{
                      fontSize: 17,
                      padding: '15px',
                      backgroundColor: '#eef1f1',
                      paddingRight: '40px',
                      marginLeft: '1px',
                    }}
                  >
                    {' '}
                    Cancel
                  </Icon>
                </>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default Table;
