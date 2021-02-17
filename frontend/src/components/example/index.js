import React from 'react';
import { Icon } from 'rsuite';
import { Header, Type } from './styles';

import { CRCard, CRTable, H2 } from 'components';
const examination = [
  {
    patientName: 'ahmed',
    status: 'Waiting',
    type: 'examination',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Finished',
    type: 'examination',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Arrived',
    type: 'examination',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
];
const Follow = [
  {
    patientName: 'ahmed',
    status: 'Waiting',
    type: 'Follow-up',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Finished',
    type: 'Follow-up',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Arrived',
    type: 'Follow-up',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
];

function Example({}) {
  return (
    <>
      <Header>Appoinments</Header>
      <Type margin="100px 772px 11px 4px" color="#019ae7">
        Examination
      </Type>
      <CRCard borderless>
        <CRTable autoHeight  data={examination}  rowHeight={35} minHeight={35} border='6px solid #037f4b'>
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
            <CRTable.CRCell>
              <Icon icon="print"> Print</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="close"> Edit</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="edit"> Cancel</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
      <Type margin="29px 791px 11px 4px" color="#037f4b">
        Follow-up
      </Type>
      <CRCard borderless>
        <CRTable autoHeight data={Follow} rowHeight={35} minHeight={35} border='6px solid #037f4b'>
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
            <CRTable.CRCell>
              <Icon icon="print"> Print</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="close"> Edit</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="edit"> Cancel</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
      <Type margin="60px 805px 9px 4px" color="#ffcc03">
        Session
      </Type>
      <CRCard borderless>
        <CRTable autoHeight data={examination} rowHeight={35} minHeight={35}  headerHeight={35} border='6px solid #ffcc03'>
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
            <CRTable.CRCell>
              <Icon icon="print"> Print</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="close"> Edit</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="edit"> Cancel</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
      <Type margin="31.5px 804px 9px 4px" color="#794bd1">
        Surgery
      </Type>
      <CRCard borderless>
        <CRTable autoHeight data={examination} rowHeight={35} minHeight={35}  headerHeight={35} border='6px solid #794bd1'>
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
            <CRTable.CRCell>
              <Icon icon="print"> Print</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="close"> Edit</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="edit"> Cancel</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
      <Type margin="39px 808px 26px 4px" color="#bc3254">
        Urgent
      </Type>
      <CRCard borderless>
        <CRTable autoHeight data={examination} rowHeight={35} minHeight={35} headerHeight={35} border='6px solid #bc3254'>
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
            <CRTable.CRCell>
              <Icon icon="print"> Print</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="close"> Edit</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              <Icon icon="edit"> Cancel</Icon>
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>  
    </>
  );
}

export default Example;
