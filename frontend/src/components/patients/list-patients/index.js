import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer, CRTable } from 'components';
import PatientsFilter from '../filter/index';
import EditPatient from '../edit-patient';
import { usePatients } from 'hooks';

function Patients() {
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { patients } = usePatients();

  const filteredPatients = useMemo(
    () =>
      patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())),
    [filter, patients]
  );

  return (
    <>
      <MainContainer title="Patients">
        {/* <Can I="view" a="Patient"> */}
        <PatientsFilter onNameChange={setFilter}></PatientsFilter>
        <CRTable
          autoHeight
          data={filteredPatients}
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

          <CRTable.CRColumn width={35}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => <EditPatient patient={data} />}
            </CRTable.CRCell>
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
          total={patients && patients.length}
          onChangePage={p => setCurrentPage(p)}
        />
        {/* </Can> */}
      </MainContainer>
    </>
  );
}

export default Patients;
