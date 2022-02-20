import React, { useState, useRef, useMemo } from 'react';
import ReactToPrint from 'react-to-print';
import {
  CRButton,
  CRSelectInput,
  CRDatePicker,
  Div,
  CRDateRangePicker,
  H5,
  H3,
  H4,
} from 'components/widgets';
import { Can } from 'components/user/can';
import axios from 'axios';
import { Form, DatePicker, Table } from 'rsuite';
import { Container, Report, Name } from './style';
import { useCourses, useSessionDefinition } from 'hooks';
import moment from 'moment';
import * as R from 'ramda';

const initialValue = {
  month: '',
  date: new Date(),
  sessionDate: [],
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
  let monthes = getMonths();
  const { sessionsDefinition, sessionStatistics } = useSessionDefinition({
    sessionId: formValue.sessionId,
    dateFrom: formValue.sessionDate[0],
    dateTo: formValue.sessionDate[1],
  });
  const { totalUnpaidOfCourses } = useCourses({});
  const totalUnpaid = R.propOr(0, 'totalUnpaid')(totalUnpaidOfCourses);
  const totalNumber = R.propOr(0, 'totalNumber')(sessionStatistics);
  const totalPrice = R.propOr(0, 'totalPrice')(sessionStatistics);
  const session = R.propOr({}, 'session')(sessionStatistics);

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

    axios({
      url: '/daily',
      params: {
        day: moment(day).toDate(),
      },
      method: 'GET',
    })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {});
  };
  const { Column, HeaderCell, Cell, Pagination } = Table;
  const refOne = useRef();
  const refTwo = useRef();
  const refThree = useRef();
  const refFour = useRef();
  let monthlyData = dataTwo?.data || [];

  return (
    <>
      <Container>
        <Can I="GenerateMonthly" an="PulsesReport">
          <Report>
            <Name>Monthly Report</Name>
            <Form formValue={formValue} onChange={setFormValue}>
              <CRSelectInput
                placeholder="Select Month"
                name="month"
                data={monthes}
                layout="inline"
                block
                style={{ width: '270px' }}
              />
            </Form>
            <CRButton onClick={() => handleMonthlyReport(formValue.month)}>
              Generate
            </CRButton>
            <ReactToPrint
              trigger={() => <CRButton primary>Print</CRButton>}
              content={() => refTwo.current}
            />
          </Report>
        </Can>
      </Container>
      <Container>
        <Can I="GenerateDaily" an="PulsesReport">
          <Report>
            <Name>Daily Report</Name>
            <Form formValue={formValue} onChange={setFormValue}>
              <CRDatePicker
                block
                name="date"
                accepter={DatePicker}
                style={{ width: '270px' }}
              />
            </Form>
            <CRButton onClick={() => handleDailyReport(formValue.date)}>
              Generate
            </CRButton>
            <ReactToPrint
              trigger={() => <CRButton primary>Print</CRButton>}
              content={() => refOne.current}
            />
          </Report>
        </Can>
      </Container>
      <Container>
        {/* <Can I="GenerateDaily" an="PulsesReport"> */}
        <Report>
          <Name>Session Report</Name>
          <Form formValue={formValue} onChange={setFormValue}>
            <Div display="flex" justifyContent="space-between">
              <CRDateRangePicker
                name="sessionDate"
                placeholder="Timeframe"
                style={{ width: '230px', marginRight: '30px' }}
              />
              <CRSelectInput
                name="sessionId"
                data={sessionsDefinition}
                style={{ width: '230px' }}
              />
            </Div>
          </Form>
          <ReactToPrint
            trigger={() => <CRButton primary>Print</CRButton>}
            content={() => refThree.current}
          />
        </Report>
        {/* </Can> */}
      </Container>
      <Container>
        <Report>
          <Name>Total Unpaid of courses Report</Name>

          <ReactToPrint
            trigger={() => <CRButton primary>Print</CRButton>}
            content={() => refFour.current}
          />
        </Report>
      </Container>
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
          <Div ref={refThree}>
            <H3 display="flex" justifyContent="center" mt={20} mb={20}>
              Session Report
            </H3>
            <H5>Session Name : {session?.name}</H5>
            <H5>TotalNumber: {totalNumber}</H5>
            <H5>TotalPrice:{totalPrice}</H5>
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
    </>
  );
};

Test.propTypes = {};

export default Test;
