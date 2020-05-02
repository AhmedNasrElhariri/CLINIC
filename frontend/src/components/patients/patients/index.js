import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'rsuite';

import { LIST_PATIENTS } from 'apollo-client/queries';
import PatientsFilter from '../patients-filter';

function Patients() {
  const history = useHistory();
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery(LIST_PATIENTS, {
    variables: {},
    onCompleted: ({ patients }) => setPatients(patients),
  });

  const onNameChange = value => {
    setPatients(
      data.patients.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <PatientsFilter onNameChange={onNameChange}></PatientsFilter>
      <Table
        autoHeight
        data={patients}
        style={{ cursor: 'pointer' }}
        onRowClick={({ id }) => {
          history.push(`/patients/${id}`);
        }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Membership Type</Table.HeaderCell>
          <Table.Cell dataKey="type" />
        </Table.Column>
      </Table>
      <Table.Pagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={currentPage}
        total={data && data.patients.length}
        onChangePage={p => setCurrentPage(p)}
      />
    </>
  );
}

export default Patients;
