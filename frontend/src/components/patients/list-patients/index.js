import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { MainContainer, CRTable, Div ,CRButton, H3, H4} from 'components';
import PatientsFilter from '../filter/index';
import EditPatient from '../edit-patient';
import { usePatients } from 'hooks';
const initialValue = {
  name: '',
  phoneNo: '',
  area: '',
  reference: '',
};
const inialCurrentPage = {
  activePage: 1,
};
const initialAreaValue = {
  areaId: null,
};
function Patients() {
  const history = useHistory();
  const [filter, setFilter] = useState(initialValue);
  const [area, setArea] = useState(initialAreaValue);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage.activePage;
  const { patients, pages } = usePatients({ page });
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  const updatedPatients = patients.map(p => {
    return { ...p, reference: p.reference.join(' ') };
  });
  const filteredPatient = useMemo(
    () =>
      updatedPatients.filter(
        p =>
          p.name.toLowerCase().includes(filter.name.toLowerCase()) ||
          p.code.toLowerCase().includes(filter.name.toLowerCase())
      ),
    [filter, updatedPatients]
  );
  const filteredPatients = useMemo(
    () => filteredPatient.filter(p => p.phoneNo.includes(filter.phoneNo)),
    [filter, filteredPatient]
  );
  const filteredPatientByArea = useMemo(
    () =>
      filteredPatients.filter(p =>
        p.area.toLowerCase().includes(filter?.area?.toLowerCase())
      ),
    [filter, filteredPatients]
  );
  const filteredPatientByReference = useMemo(
    () =>
      filteredPatientByArea.filter(p =>
        p.reference?.toLowerCase().includes(filter?.reference.toLowerCase())
      ),
    [filter, filteredPatientByArea]
  );
  const ref = useRef();
  const refTwo = useRef();
  return (
    <>
      <MainContainer
        title="Patients"
        more={
          <Div display="flex">
            <ReactToPrint
              trigger={() => (
                <CRButton variant="primary">Social Report +</CRButton>
              )}
              content={() => ref.current}
            />
            <ReactToPrint
              trigger={() => (
                <CRButton variant="primary" ml={1}>
                  Area Report +
                </CRButton>
              )}
              content={() => refTwo.current}
            />
          </Div>
        }
      >
        <Div display="flex">
          <Div mr={3}>
            <PatientsFilter
              formValue={filter}
              setFormValue={setFilter}
              areaFormValue={area}
              setAreaFormValue={setArea}
            ></PatientsFilter>
          </Div>
        </Div>

        <CRTable
          data={filteredPatientByReference}
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
            <CRTable.CRHeaderCell>Code</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="code" />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Area</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ area }) => (
                <CRTable.CRCellStyled bold>{area}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Reference</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ reference }) => (
                <CRTable.CRCellStyled bold>{reference}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
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
          activePage={currentPage?.activePage}
          pages={pages}
          onSelect={handleSelect}
          total={
            filteredPatientByReference && filteredPatientByReference.length
          }
          onChangePage={p => setCurrentPage(p)}
        />
        {/* </Can> */}
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={ref}>
            <H3 textAlign="center" margin="10px">
              Social Report
            </H3>
            <Div display="flex">
              <H4 margin="0px 10px">Reference By:</H4>
              <H4>{filter.reference}</H4>
            </Div>
            <Div display="flex">
              <H4 margin="0px 10px">Total Number Of Patients:</H4>
              <H4>{filteredPatientByReference.length}</H4>
            </Div>
          </Div>
        </Div>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={refTwo}>
            <H3 textAlign="center" margin="10px">
              Area Report
            </H3>
            <Div display="flex">
              <H4 margin="0px 10px">The Area:</H4>
              <H4>{filter.area}</H4>
            </Div>
            <Div display="flex">
              <H4 margin="0px 10px">Total Number Of Patients:</H4>
              <H4>{filteredPatientByReference.length}</H4>
            </Div>
          </Div>
        </Div>
      </MainContainer>
    </>
  );
}

export default Patients;
