import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { formatDate } from 'utils/date';
import { filterAppointments, sortAppointments } from 'services/appointment';
import { Div, CRCard, H3, CRTable } from 'components';
import Filter from './filter';
import useFetchAppointments from 'hooks/use-appointments';
import ToolBar from '../today-appointments/toolbar';

function Appointments() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({ date: [], patient: '' });

  const {
    branches,
    doctors,
    specialties,
    appointments,
  } = useFetchAppointments();
  console.log(appointments);
  const filteredAppointments = useMemo(
    () => sortAppointments(filterAppointments(appointments, formValue)),
    [appointments, formValue]
  );

  return (
    <>
      <H3 mb={64}>Appointments</H3>
      {/* <ToolBar
        formValue={formValue}
        onChange={setFormValue}
        branches={branches}
        specialties={specialties}
        doctors={doctors}
      /> */}
      <Div mb={4}>
        <Filter formValue={formValue} onChange={setFormValue} />
      </Div>

      <CRCard borderless>
        <CRTable
          autoHeight
          data={filteredAppointments}
          onRowClick={({ patient }) => {
            history.push(`/patients/${patient.id}`);
          }}
          bordered={false}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name">
              {({ patient }) => (
                <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="type" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name">
              {({ date }) => (
                <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default Appointments;
