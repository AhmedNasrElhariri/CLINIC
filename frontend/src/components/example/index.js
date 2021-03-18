import React from 'react';
import { Header, StyledPanel } from './styles';
import Table from './table';
import { useHistory } from 'react-router-dom';

import { formatDate, formatFullDay } from 'utils/date';
// import { filterAppointments, sortAppointments } from 'services/appointment';
// import { Div, CRCard, H3, CRTable } from 'components';
// import Filter from './filter';
import useFetchAppointments from 'hooks/use-appointments';

function Example() {
  const history = useHistory();
  // const [formValue, setFormValue] = useState({ date: [], patient: '' });

  const {
    branches,
    doctors,
    specialties,
    appointments,
  } = useFetchAppointments();
  console.log(appointments);
  const ExaminationApp = appointments.filter(a => a.type == 'Examination');
  const ExaminationAppointments = ExaminationApp.map(a => {
    return {
      id: a.id,
      status: a.status,
      patientName: a.patient.name,
      type: a.type,
      timeline: formatDate(a.date),
      date: formatFullDay(a.date),
      doctor: 'ahmed',
    };
  });
  const FollowUp = appointments.filter(a => a.type == 'Followup');
  const FollowUpAppointments = FollowUp.map(a => {
    return {
      id: a.id,
      status: a.status,
      patientName: a.patient.name,
      type: a.type,
      timeline: formatDate(a.date),
      date: formatFullDay(a.date),
      doctor: 'ahmed',
    };
  });
  const Urgent = appointments.filter(a => a.type == 'Urgent');
  const UrgentAppointments = Urgent.map(a => {
    return {
      id: a.id,
      status: a.status,
      patientName: a.patient.name,
      type: a.type,
      timeline: formatDate(a.date),
      date: formatFullDay(a.date),
      doctor: 'ahmed',
    };
  });
  const Sessionapp = appointments.filter(a => a.type == 'Session');
  const SessionAppointments = Sessionapp.map(a => {
    return {
      id: a.id,
      status: a.status,
      patientName: a.patient.name,
      type: a.type,
      timeline: formatDate(a.date),
      date: formatFullDay(a.date),
      doctor: 'ahmed',
    };
  });
  // const filteredAppointments = useMemo(
  //   () => sortAppointments(filterAppointments(appointments, formValue)),
  //   [appointments, formValue]
  // );
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
        <Table data={ExaminationAppointments} borderLeft="6px solid #019ae7" />
      </StyledPanel>
      <StyledPanel
        header="Follow-up"
        collapsible
        bodyFill
        defaultExpanded
        color="#037f4b"
      >
        <Table data={FollowUpAppointments} borderLeft="6px solid #037f4b" />
      </StyledPanel>

      <StyledPanel
        header="Session"
        collapsible
        bodyFill
        defaultExpanded
        color="#ffcc03"
      >
        <Table data={SessionAppointments} borderLeft="6px solid #ffcc03" />
      </StyledPanel>
      {/* <StyledPanel
        header="Surgery"
        collapsible
        bodyFill
        defaultExpanded
        color="#794bd1"
      >
        <Table data={updateAppointments} borderLeft="6px solid #794bd1" />
      </StyledPanel> */}

      <StyledPanel
        header="Urgent"
        collapsible
        bodyFill
        defaultExpanded
        color="#bc3254"
      >
        <Table data={UrgentAppointments} borderLeft="6px solid #bc3254" />
      </StyledPanel>
    </>
  );
}

export default Example;
