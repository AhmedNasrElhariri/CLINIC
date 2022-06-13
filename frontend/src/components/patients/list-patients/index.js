import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { MainContainer, CRTable, Div, CRButton, H3, H4 } from 'components';
import { Can } from 'components/user/can';
import PatientsFilter from '../filter/index';
import EditPatient from '../edit-patient';
import { usePatients } from 'hooks';
import { useTranslation } from 'react-i18next';
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
  const { patients, pages, patientsReports } = usePatients({
    page,
    name: filter.name,
    phoneNo: filter.phoneNo,
    reference: filter.reference,
    area: filter.area,
  });
  const { t } = useTranslation();
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );

  const ref = useRef();
  const refTwo = useRef();
  return (
    <>
      <MainContainer
        title={t('patients')}
        more={
          <Div display="flex">
            <Can I="CreateSocialReport" an="Patient">
              <ReactToPrint
                trigger={() => (
                  <CRButton variant="primary">{t('socialReport')} +</CRButton>
                )}
                content={() => ref.current}
              />
            </Can>
            <Can I="CreateAreaReport" an="Patient">
              <ReactToPrint
                trigger={() => (
                  <CRButton variant="primary" ml={1} mr={1}>
                    {t('areaReport')} +
                  </CRButton>
                )}
                content={() => refTwo.current}
              />
            </Can>
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
          data={patients}
          autoHeight
          onRowClick={({ id }) => {
            history.push(`/patients/${id}`);
          }}
          bordered={false}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('patient')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('membershipType')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="type" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('phoneNo')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ phoneNo }) => (
                <CRTable.CRCellStyled bold>{phoneNo}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('code')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="code" />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('area')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ area }) => (
                <CRTable.CRCellStyled bold>{area}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('reference')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ reference }) => (
                <CRTable.CRCellStyled bold>
                  <Div display="flex">
                    {reference.map(r => (
                      <Div>
                        {' - '}
                        {r}
                        {'  '}
                      </Div>
                    ))}
                  </Div>
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => <EditPatient patient={data} editName={t('edit')} />}
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
          total={patients && patients.length}
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
              <H4>{patientsReports.patientsReferenceCount}</H4>
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
              <H4>{patientsReports.patientsAreaCount}</H4>
            </Div>
          </Div>
        </Div>
      </MainContainer>
    </>
  );
}

export default Patients;
