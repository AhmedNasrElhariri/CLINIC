import React from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'rsuite';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { formatDate } from 'utils/date';

function Appointments() {
  const history = useHistory();

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {},
  });

  const appointments = R.propOr([], 'appointments')(data);

  return (
    <Table
      autoHeight
      data={appointments}
      style={{ cursor: 'pointer' }}
      onRowClick={({ id }) => {
        history.push(`/appointments/${id}`);
      }}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.Cell dataKey="patient.name" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.Cell dataKey="type" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.Cell dataKey="date">{({ date }) => formatDate(date)}</Table.Cell>
      </Table.Column>
    </Table>
  );
}

export default Appointments;
