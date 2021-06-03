import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer, CRTable, CRLabel, Div } from 'components';

import PatientsFilter from '../filter/index';
import EditPatient from '../edit-patient';
import { usePatients } from 'hooks';
const initialValue = {
  name: '',
  phoneNo: '',
};
function Patients() {
  const history = useHistory();
  const [filter, setFilter] = useState(initialValue);
  const [currentPage, setCurrentPage] = useState(1);
  const { patients } = usePatients();

  const filteredPatient = useMemo(
    () =>
      patients.filter(p => 
        p.name.toLowerCase().includes(filter.name.toLowerCase()),
      ),
    [filter, patients]
  );
  const filteredPatients = useMemo(
    () =>
    filteredPatient.filter(p => 
          p.phoneNo.includes(filter.phoneNo)
      ),
    [filter, filteredPatient]
  );
  return (
    <>
      <MainContainer title="Patients">
        <Div display="flex">
          <Div mr={3}>
            <PatientsFilter
              formValue={filter}
              setFormValue={setFilter}
            ></PatientsFilter>
          </Div>
        </Div>
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

          <CRTable.CRColumn flexGrow={1}>
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
