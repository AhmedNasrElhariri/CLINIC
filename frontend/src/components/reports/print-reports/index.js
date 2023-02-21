import React, { useState, useRef, memo, useCallback } from 'react';
import ReactToPrint from 'react-to-print';
import {
  CRButton,
  CRSelectInput,
  CRDatePicker,
  Div,
  CRDateRangePicker,
  H5,
  H3,
  CRTable,
} from 'components/widgets';
import { Can } from 'components/user/can';
import axios from 'axios';
import { Form, DatePicker, Table } from 'rsuite';
import { Container, Report, Name } from './style';
import { useCourses, useSessionDefinition } from 'hooks';
import moment from 'moment';
import * as R from 'ramda';
import { MultiCascader } from 'rsuite';
import { useTranslation } from 'react-i18next';
import ReportRow from './report-row';
import SessionReport from './sessions-report';
import { getPdfReport } from 'services/reports';

const initialValue = {
  month: '',
  date: new Date(),
  sessionDate: [],
  sessionsIds: [],
};
const getMonths = () => {
  let dateStart = moment().startOf('year');
  let dateEnd = moment(new Date(), 'YYYY-MM-DD');
  let timeValues = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    let date = { id: '', name: '' };
    date.id = dateStart.toISOString();
    date.name = dateStart.format('MMMM-YYYY');
    timeValues.push(date);
    dateStart.add(1, 'month');
  }
  return timeValues;
};
const Test = props => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [formValue, setFormValue] = useState(initialValue);
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState({});
  const [showSessionData, setShowSessionData] = useState(false);
  let monthes = getMonths();
  const { t } = useTranslation();
  const { sessionsDefinition, sessionStatistics } = useSessionDefinition({
    sessionsIds: formValue.sessionsIds,
    dateFrom: formValue.sessionDate[0],
    dateTo: formValue.sessionDate[1],
  });
  const { totalUnpaidOfCourses } = useCourses({});
  const totalUnpaid = R.propOr(0, 'totalUnpaid')(totalUnpaidOfCourses);
  // const totalNumber = R.propOr(0, 'totalNumber')(sessionStatistics);
  // const totalPrice = R.propOr(0, 'totalPrice')(sessionStatistics);
  // const session = R.propOr({}, 'session')(sessionStatistics);
  const updatedSessionsDefinitions = sessionsDefinition.map(s => {
    return { label: s.name, value: s.id };
  });
  const handleMonthlyReport = async month => {
    setLoading(true);
    setError(null);
    axios({
      url: `/monthly`,
      params: {
        month: moment(month).toDate(),
      },
      method: 'GET',
    })
      .then(res => {
        setDataTwo(res.data);
      })
      .catch(err => {});
  };
  const handleDailyReport = async day => {
    setLoading(true);
    setError(null);
    let res = null;
    // const file = fs.createWriteStream("file.pdf");
    axios({
      url: '/accounting',
      responseType: 'blob', // important
      method: 'GET',
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  const handleSessionReport = useCallback(() => {
    const params = {
      sessionIds: formValue?.sessionsIds,
      dateFrom: formValue.sessionDate[0],
      dateTo: formValue.sessionDate[1],
    };
    getPdfReport('/sessions-pdf-report', params, 'session-report.pdf');
  }, [formValue]);
  const handleSessionExcelReport = useCallback(() => {
    axios({
      url: '/sessions-excel-report',
      responseType: 'blob', // important
      params: {
        sessionIds: formValue?.sessionsIds,
        dateFrom: formValue.sessionDate[0],
        dateTo: formValue.sessionDate[1],
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `sessions-statistics-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  }, [formValue]);
  const { Column, HeaderCell, Cell, Pagination } = Table;
  const refOne = useRef();
  const refTwo = useRef();
  const refThree = useRef();
  const refFour = useRef();
  let monthlyData = dataTwo?.data || [];
  return (
    <div className="flex flex-col gap-3">
      {/* <Container> */}
      <ReportRow>
        <Can I="GenerateMonthly" an="PulsesReport">
          <Name>{t('monthlyReport')}</Name>
          <Form formValue={formValue} onChange={setFormValue}>
            <CRSelectInput
              placeholder={t('select')}
              name="month"
              data={monthes}
              layout="inline"
              block
              style={{ width: '270px' }}
            />
          </Form>
          <CRButton onClick={() => handleMonthlyReport(formValue.month)}>
            {t('generate')}
          </CRButton>
          <ReactToPrint
            trigger={() => <CRButton primary>{t('print')}</CRButton>}
            content={() => refTwo.current}
          />
        </Can>
      </ReportRow>
      {/* <Report> */}

      {/* </Report> */}
      {/* </Container> */}
      <ReportRow>
        <Can I="GenerateDaily" an="PulsesReport">
          <Name>{t('dailyReport')}</Name>
          <Form formValue={formValue} onChange={setFormValue}>
            <CRDatePicker
              block
              name="date"
              accepter={DatePicker}
              style={{ width: '270px' }}
            />
          </Form>
          <CRButton onClick={() => handleDailyReport(formValue.date)}>
            {t('generate')}
          </CRButton>
          <ReactToPrint
            trigger={() => <CRButton primary>{t('print')}</CRButton>}
            content={() => refOne.current}
          />
        </Can>
      </ReportRow>
      <SessionReport
        t={t}
        handleSessionReport={handleSessionReport}
        sessionsDefinition={updatedSessionsDefinitions}
        formValue={formValue}
        setFormValue={setFormValue}
        handleSessionExcelReport={handleSessionExcelReport}
      />
      {/* <Div>
        <Div
          style={!showSessionData ? { overflow: 'hidden', height: '0px' } : {}}
        >
          <Div ref={refThree}>
            <H3 display="flex" justifyContent="center" mt={20} mb={20}>
              Session Report
            </H3>
            <Div>
              {sessionStatistics.map(st => (
                <Div mb={20} ml={20}>
                  <H5>Session Name : {st.name}</H5>
                  <H5>TotalNumber: {st.totalNumber}</H5>
                  <H5>TotalPrice:{st.totalPrice}</H5>

                  <CRTable autoHeight data={st.sessions}>
                    <CRTable.CRColumn width={300}>
                      <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
                      <CRTable.CRCell>
                        {({ patient }) => (
                          <CRTable.CRCellStyled bold>
                            {patient.name}
                          </CRTable.CRCellStyled>
                        )}
                      </CRTable.CRCell>
                    </CRTable.CRColumn>
                    <CRTable.CRColumn width={300}>
                      <CRTable.CRHeaderCell>
                        {t('phoneNo')}
                      </CRTable.CRHeaderCell>
                      <CRTable.CRCell>
                        {({ patient }) => (
                          <CRTable.CRCellStyled bold>
                            {patient.phoneNo}
                          </CRTable.CRCellStyled>
                        )}
                      </CRTable.CRCell>
                    </CRTable.CRColumn>
                    <CRTable.CRColumn width={300}>
                      <CRTable.CRHeaderCell>{t('doctor')}</CRTable.CRHeaderCell>
                      <CRTable.CRCell>
                        {({ doctor }) => (
                          <CRTable.CRCellStyled bold>
                            {doctor.name}
                          </CRTable.CRCellStyled>
                        )}
                      </CRTable.CRCell>
                    </CRTable.CRColumn>
                  </CRTable>
                </Div>
              ))}
            </Div>
          </Div>
        </Div>
      </Div> */}
      <ReportRow>
        <Name>{t('totalUnpaidOfCoursesReport')}</Name>

        <ReactToPrint
          trigger={() => <CRButton primary>{t('print')}</CRButton>}
          content={() => refFour.current}
        />
      </ReportRow>
      <Div>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={refOne} borderless>
            <Div display="flex" justifyContent="center" mt={20} mb={20}>
              Daily Report{' '}
            </Div>
            <Table
              data={data}
              autoHeight
              borderless
              style={{ marginTop: '30px' }}
            >
              <Column width={200} align="center" fixed>
                <HeaderCell>Doctor Name</HeaderCell>
                <Cell dataKey="doctor" />
              </Column>

              <Column width={150}>
                <HeaderCell>Patient Name</HeaderCell>
                <Cell dataKey="patient" />
              </Column>

              <Column width={150}>
                <HeaderCell>Power One</HeaderCell>
                <Cell dataKey="powerOne" />
              </Column>

              <Column width={150}>
                <HeaderCell>Power Two</HeaderCell>
                <Cell dataKey="powerTwo" />
              </Column>

              <Column width={150}>
                <HeaderCell>Number of Pulses</HeaderCell>
                <Cell dataKey="pulses" />
              </Column>
            </Table>
          </Div>
        </Div>
      </Div>
      <Div>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={refTwo} borderless>
            <Div display="flex" justifyContent="center" mt={20} mb={20}>
              Monthly Report{' '}
            </Div>
            <Div m="5px">
              Month Name:{'  '} {dataTwo.monthName}
            </Div>
            <Div m="5px">
              Num Of Courses: {'  '}
              {dataTwo.numOfCourses}
            </Div>
            <Div m="5px">
              Num Of Examination:{'  '} {dataTwo.numOfExamination}
            </Div>
            <Div m="5px">
              Number Of Followup:{'  '} {dataTwo.numOfFollowup}
            </Div>
            <Div m="5px">
              Number Of Sessions: {'  '}
              {dataTwo.numOfSession}
            </Div>
            <Div m="5px">
              Total Expenses:{'  '} {dataTwo.totalExpenses}
            </Div>
            <Div m="5px">
              Total Revenues:{'  '}
              {dataTwo.totalRevenues}
            </Div>
            <Div m="5px">
              Total Sales: {'  '}
              {dataTwo.totalSales}
            </Div>
            <Table
              data={monthlyData}
              autoHeight
              borderless
              style={{ marginTop: '30px' }}
            >
              <Column width={200} align="center" fixed>
                <HeaderCell>Date</HeaderCell>
                <Cell dataKey="date" />
              </Column>

              <Column width={150}>
                <HeaderCell>Before</HeaderCell>
                <Cell dataKey="before" />
              </Column>

              <Column width={150}>
                <HeaderCell>after</HeaderCell>
                <Cell dataKey="after" />
              </Column>

              <Column width={150}>
                <HeaderCell>Difference</HeaderCell>
                <Cell dataKey="diff" />
              </Column>

              <Column width={150}>
                <HeaderCell>Number of Pulses</HeaderCell>
                <Cell dataKey="numOfPulses" />
              </Column>
            </Table>
          </Div>
        </Div>
      </Div>
      <Div>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={refFour}>
            <H3 display="flex" justifyContent="center" mt={20} mb={20}>
              Total Unpaid of courses Report
            </H3>
            <Div display="flex">
              <H3 mr="150px">Total</H3>
              <H3 mr="5px">{totalUnpaid}</H3>
              <H3>Egy</H3>
            </Div>
          </Div>
        </Div>
      </Div>
    </div>
  );
};

Test.propTypes = {};

export default memo(Test);
