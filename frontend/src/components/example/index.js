import React from 'react';
import { Header } from './styles';
import Table from './table';

import { useAppointments } from 'hooks';

function Example() {
  const { appointments } = useAppointments();
  const ExaminationApp = appointments.filter(a => a.type === 'Examination');
  const ExaminationAppointments = ExaminationApp;

  return (
    <>
      <Header>Appoinments</Header>
      <Table
        rowHeight={35}
        data={ExaminationAppointments}
        borderLeft="6px solid #019ae7"
      />
    </>
  );
}

export default Example;
