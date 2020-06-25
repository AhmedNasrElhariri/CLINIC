import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { LIST_PATIENTS } from 'apollo-client/queries';
import { MainContainer, CRTable } from 'components';
import PatientsFilter from '../filter/index';

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
      <MainContainer title="Patients">
        <PatientsFilter onNameChange={onNameChange}></PatientsFilter>
        <CRTable
          autoHeight
          data={patients}
          style={{ cursor: 'pointer' }}
          onRowClick={({ id }) => {
            history.push(`/patients/${id}`);
          }}
          bordered={false}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Membership Type</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="type" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="phoneNo" />
          </CRTable.CRColumn>
        </CRTable>

        <CRTable.CRPagination
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
      </MainContainer>
    </>
  );
}

export default Patients;
