import React from 'react';
import { Header, StyledPanel } from './styles';
import Table from './table';
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
const Session = [
  {
    patientName: 'ahmed',
    status: 'Waiting',
    type: 'Session',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Finished',
    type: 'Session',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Arrived',
    type: 'Session',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
];
const Surgery = [
  {
    patientName: 'ahmed',
    status: 'Waiting',
    type: 'Surgery',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Finished',
    type: 'Surgery',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Arrived',
    type: 'Surgery',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
];
const Urgent = [
  {
    patientName: 'ahmed',
    status: 'Waiting',
    type: 'Urgent',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Finished',
    type: 'Urgent',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
  {
    patientName: 'ahmed',
    status: 'Arrived',
    type: 'Urgent',
    timeline: '22/2/2020',
    date: '08:30 PM - 08:45 PM',
    doctor: 'ahmed',
  },
];

function Example({}) {
  return (
    <>
      <Header>Appoinments</Header>
      <StyledPanel
        header="Examination"
        collapsible
        bodyFill
        defaultExpanded
        color="#019ae7"
      >
        <Table data={examination} borderLeft="6px solid #019ae7" />
      </StyledPanel>
      <StyledPanel
        header="Follow-up"
        collapsible
        bodyFill
        defaultExpanded
        color="#037f4b"
      >
        <Table data={Follow} borderLeft="6px solid #037f4b" />
      </StyledPanel>
      <StyledPanel
        header="Session"
        collapsible
        bodyFill
        defaultExpanded
        color="#ffcc03"
      >
        <Table data={Session} borderLeft="6px solid #ffcc03" />
      </StyledPanel>
      <StyledPanel
        header="Surgery"
        collapsible
        bodyFill
        defaultExpanded
        color="#794bd1"
      >
        <Table data={Surgery} borderLeft="6px solid #794bd1" />
      </StyledPanel>
      <StyledPanel
        header="Urgent"
        collapsible
        bodyFill
        defaultExpanded
        color="#bc3254"
      >
        <Table data={Urgent} borderLeft="6px solid #bc3254" />
      </StyledPanel>
    </>
  );
}

export default Example;
