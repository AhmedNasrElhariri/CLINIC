import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { MainContainer, CRTable, Div, CRButton, H3, H4 } from 'components';
import { Can } from 'components/user/can';
import PatientsFilter from '../filter/patients-reports-filter';
import EditPatient from '../edit-patient';
import { usePatients } from 'hooks';
import { useTranslation } from 'react-i18next';
import { format } from 'utils/date';

const initialValue = {
  area: '',
  reference: '',
  patientLevel: null,
  age: null,
  session: null,
  type: null,
};
const inialCurrentPage = {
  activePage: 1,
};
const initialAreaValue = {
  areaId: null,
};
function Patients() {
  const history = useHistory();
  const ref = useRef();
  const { t } = useTranslation();
  const [filter, setFilter] = useState(initialValue);
  const [area, setArea] = useState(initialAreaValue);
  const [period, setPeriod] = useState([]);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage.activePage;

  const { ReportsPatients, reportsPages, reportsPatientsCount } = usePatients({
    page,
    reference: filter.reference,
    area: filter.area,
    patientLevel: filter.patientLevel,
    age: filter.age,
    type: filter.type,
    period: period,
    reference: filter.reference,
  });

  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );

  console.log(period, 'period4');

  return (
    <>
      <Can I="View" an="Patient">
        <MainContainer
          title={t('patients')}
          more={
            <Div display="flex">
              <Can I="CreateSocialReport" an="Patient">
                <ReactToPrint
                  trigger={() => (
                    <CRButton variant="primary">{t('print')} +</CRButton>
                  )}
                  content={() => ref.current}
                />
              </Can>
              {/* <Can I="CreateAreaReport" an="Patient">
                <ReactToPrint
                  trigger={() => (
                    <CRButton variant="primary" ml={1} mr={1}>
                      {t('areaReport')} +
                    </CRButton>
                  )}
                  content={() => refTwo.current}
                />
              </Can> */}
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
                setPeriod={setPeriod}
              ></PatientsFilter>
            </Div>
          </Div>
          <CRTable
            data={ReportsPatients}
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
              <CRTable.CRCell>
                {({ type }) => (
                  <CRTable.CRCellStyled bold>{type}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
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
              <CRTable.CRHeaderCell>{t('phoneNoTwo')}</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ phoneNoTwo }) => (
                  <CRTable.CRCellStyled bold>{phoneNoTwo}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>{t('code')}</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ code }) => (
                  <CRTable.CRCellStyled bold>{code}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>{t('maritalStatus')}</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ maritalStatus }) => (
                  <CRTable.CRCellStyled bold>
                    {maritalStatus}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>{t('patientLevel')}</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ patientLevel }) => (
                  <CRTable.CRCellStyled bold>
                    {patientLevel}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>{t('email')}</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ email }) => (
                  <CRTable.CRCellStyled bold>{email}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
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
                {data => <EditPatient patient={data} t={t} />}
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
            pages={reportsPages}
            onSelect={handleSelect}
            total={ReportsPatients && ReportsPatients.length}
            onChangePage={p => setCurrentPage(p)}
          />

          <Div style={{ overflow: 'hidden', height: '0px' }}>
            <Div ref={ref}>
              <H3 textAlign="center" margin="10px">
                Patients Report
              </H3>
              {period.length > 0 && (
                <Div display="flex">
                  <H4 margin="0px 10px">The Period from :</H4>
                  <H4>{format(period[0])}  to  {format(period[1])}</H4>
                </Div>
              )}
              {filter.age && (
                <Div display="flex">
                  <H4 margin="0px 10px">age between:</H4>
                  <H4>
                    {filter?.age[0]} - {filter?.age[1]}
                  </H4>
                </Div>
              )}
              {filter.type && (
                <Div display="flex">
                  <H4 margin="0px 10px">Type :</H4>
                  <H4>{filter.type}</H4>
                </Div>
              )}
              {filter.patientLevel && (
                <Div display="flex">
                  <H4 margin="0px 10px">Patient Level :</H4>
                  <H4>{filter.patientLevel}</H4>
                </Div>
              )}
              {filter.reference && (
                <Div display="flex">
                  <H4 margin="0px 10px">Reference By:</H4>
                  <H4>{filter.reference}</H4>
                </Div>
              )}
              {filter.area && (
                <Div display="flex">
                  <H4 margin="0px 10px">Area:</H4>
                  <H4>{filter.area}</H4>
                </Div>
              )}

              <Div display="flex">
                <H4 margin="0px 10px">Total Number Of Patients:</H4>
                <H4>{reportsPatientsCount}</H4>
              </Div>
            </Div>
          </Div>
        </MainContainer>
      </Can>
    </>
  );
}

export default Patients;
