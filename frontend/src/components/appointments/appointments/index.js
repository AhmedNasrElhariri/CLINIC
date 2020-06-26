import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { formatDate } from 'utils/date';
import { filterAppointments } from 'services/appointment';
import { Div, CRCard, H3, CRTable } from 'components';
import Filter from './filter';
import useGlobalState from 'state';

const fetchedAppointmetns = data => R.propOr([], 'appointments')(data);

function Appointments() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({ date: [], name: '' });
  const [appointments, setAppointments] = useState([]);
  const [currentClinic] = useGlobalState('currentClinic');

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: { input: { clinicIds: [currentClinic.id] } },
  });

  useEffect(() => {
    const appointments = fetchedAppointmetns(data);
    setAppointments(filterAppointments(appointments, formValue));
  }, [data, formValue]);

  return (
    <>
      <H3 mb={64}>Appointments</H3>
      <Div mb={4}>
        <Filter formValue={formValue} onChange={setFormValue} />
      </Div>

      <CRCard borderless>
        <CRTable
          autoHeight
          data={appointments}
          style={{ cursor: 'pointer' }}
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
