import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { formatDate } from 'utils/date';
import { filterAppointments } from 'services/appointment';
import { Div, CRCard, H3, CRTable } from 'components';
import Filter from './filter';
import useFetchAppointments from 'hooks/fetch-appointments';

function Appointments() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({ date: [], patient: '' });

  const { appointments } = useFetchAppointments();

  const filteredAppointments = useMemo(
    () => filterAppointments(appointments, formValue),
    [appointments, formValue]
  );

  return (
    <>
      <H3 mb={64}>Appointments</H3>
      <Div mb={4}>
        <Filter formValue={formValue} onChange={setFormValue} />
      </Div>

      <CRCard borderless>
        <CRTable
          autoHeight
          data={filteredAppointments}
          onRowClick={({ id }) => {
            history.push(`/appointments/${id}`);
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
